use std::{collections::HashMap, sync::{Arc, RwLock}};

use actix::prelude::*;
use actix_broker::BrokerSubscribe;

use crate::{messages::{ChatMessage, JoinRoom, LeaveRoom, SendMessage}};

type Client = Recipient<ChatMessage>;
type Room = HashMap<usize, Client>;

#[derive(Clone)]
pub struct WsChatServer {
    rooms: Arc<RwLock<HashMap<String, Room>>>,
}

lazy_static! {
    static ref ROOMS: Arc<RwLock<HashMap<String, Room>>> = Arc::new(RwLock::new(Default::default()));
}

impl Default for WsChatServer {
    fn default() -> Self {
        let ws = WsChatServer { rooms: ROOMS.clone() };
        return ws;
    }
}


impl SystemService for WsChatServer {}
impl Supervised for WsChatServer {}

impl WsChatServer {

    pub fn create_room(room_name: &str) {
        let mut rooms = match ROOMS.write() {
            Ok(rooms) => rooms,
            Err(err) => {
                log::debug!("Error while requesting write lock. Error was: {}", err);
                return;
            },
        };

        if !rooms.contains_key(room_name) {
            let room: HashMap<usize, Client> = HashMap::new();
            rooms.insert(room_name.to_string(), room);
        }
    }



    fn take_room(&mut self, room_name: &str) -> Option<Room> {
        let mut guard = match self.rooms.write() {
            Ok(guard) => guard,
            Err(err) => {
                log::debug!("Error waiting for write lock. Error was: {}", err);
                return None;
            },
        };
        let room = match guard.get_mut(room_name){
            Some(room) => room,
            None => {
                log::debug!("Failed to get mutable reference of RW Guard");
                return None;
            },
        };
        let room = std::mem::take(room);
        Some(room)
    }

    fn add_client_to_room(&mut self, room_name: &str, id: Option<usize>, client: Client) -> usize {
        log::info!("In add_client_to_room Handler. Adding Client to room: {}", room_name);
        let mut id = id.unwrap_or_else(rand::random::<usize>);

        if let Some(room) = self.rooms.write().unwrap().get_mut(room_name) {
            loop {
                if room.contains_key(&id) {
                    id = rand::random::<usize>();
                } else {
                    break;
                }
            }

            room.insert(id, client);
            return id;
        }

        // Create a new room for the first client
        let mut room: Room = HashMap::new();

        room.insert(id, client);
        self.rooms.write().unwrap().insert(room_name.to_owned(), room);

        id
    }

    pub fn send_chat_message(&mut self, room_name: &str, msg: &str, _src: usize) -> Option<()> {
        let mut room = match self.take_room(room_name) {
            Some(room) => room,
            None => {
                    log::debug!("Error, could not take room.");
                    return None;
                },
        };

        for (id, client) in room.drain() {
            if client.try_send(ChatMessage(msg.to_owned())).is_ok() {
                self.add_client_to_room(room_name, Some(id), client);
            }
        }

        Some(())
    }
}

impl Actor for WsChatServer {
    type Context = Context<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        log::info!("WsChatServer has started.");
        self.subscribe_system_async::<LeaveRoom>(ctx);
        self.subscribe_system_async::<SendMessage>(ctx);
    }
}

impl Handler<JoinRoom> for WsChatServer {
    type Result = MessageResult<JoinRoom>;

    fn handle(&mut self, msg: JoinRoom, _ctx: &mut Self::Context) -> Self::Result {
        log::info!("In Join Room Handler.");
        let JoinRoom(room_name, client) = msg;

        let id = self.add_client_to_room(&room_name, None, client);
        
        MessageResult(id)
    }
}

impl Handler<LeaveRoom> for WsChatServer {
    type Result = ();

    fn handle(&mut self, msg: LeaveRoom, _ctx: &mut Self::Context) {
        log::info!("Removing ws client from room.");
        if let Some(room) = self.rooms.write().unwrap().get_mut(&msg.0) {
            room.remove(&msg.1);
        }
    }
}

impl Handler<SendMessage> for WsChatServer {
    type Result = ();

    fn handle(&mut self, msg: SendMessage, _ctx: &mut Self::Context) {
        let SendMessage(room_name, id, msg) = msg;
        self.send_chat_message(&room_name, &msg, id);
    }
}
