use actix::{Actor, ActorContext, StreamHandler, Handler, SystemService, AsyncContext, WrapFuture, ActorFutureExt, fut, ContextFutureSpawner};
use actix_web_actors::ws;
use actix_broker::BrokerIssue;

use crate::messages::{ChatMessage, LeaveRoom, JoinRoom};
use crate::ws_server::WsChatServer;


pub struct WsConn {
    room: String,
    id: usize,
}

impl WsConn {
    pub fn new(room: &str) -> WsConn {
        WsConn {
            room: room.to_string(),
            id: rand::random::<usize>(),
        }        
    }

    pub fn join_room(&mut self, room_name: &str, ctx: &mut ws::WebsocketContext<Self>) {
        let room_name = room_name.to_owned();
        // First send a leave message for the current room
        let leave_msg = LeaveRoom(self.room.clone(), self.id);

        // issue_sync comes from having the `BrokerIssue` trait in scope.
        self.issue_system_sync(leave_msg, ctx);      
        log::info!("Ws client sent leave msg.");  

        // Then send a join message for the new room
        let join_msg = JoinRoom(
            room_name.to_owned(),
            ctx.address().recipient(),
        );
        

        WsChatServer::from_registry()
            .send(join_msg)
            .into_actor(self)
            .then(move |id, act, _ctx| {
                if let Ok(id) = id {
                    act.id = id;
                    act.room = room_name.clone().to_string();
                }

                fut::ready(())
            })
            .wait(ctx);

        log::info!("Ws client sent join msg."); 
    }
}

impl Actor for WsConn {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        log::info!("ws client started.");
        self.join_room(self.room.to_owned().as_str(), ctx);
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        log::info!(
            "WsConn closed for {} in room {}",
            self.id,
            self.room
        );
    }
}

impl Handler<ChatMessage> for WsConn {
    type Result = ();

    fn handle(&mut self, msg: ChatMessage, ctx: &mut Self::Context) {
        ctx.text(msg.0);
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for WsConn {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        let msg = match msg {
            Err(_) => {
                ctx.stop();
                return;
            }
            Ok(msg) => msg,
        };

        log::debug!("WEBSOCKET MESSAGE: {:?}", msg);

        match msg {
            ws::Message::Text(_) => (),
            ws::Message::Close(reason) => {
                ctx.close(reason);
                ctx.stop();
            }
            _ => {}
        }
    }
}

