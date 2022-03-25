use std::time::Duration;
use std::{env, thread::sleep};
use std::fs::File;
use std::io::Write;
use actix_web::{App, HttpServer, middleware::Logger};
use actix_cors::Cors;
use tokio::task;

#[macro_use]
extern crate lazy_static;

mod protobuf_messages;
mod actions;
mod data;
mod ws_clients;
mod messages;
mod ws_server;

pub async fn write_to_file(buf: &[u8], file_name: &str) -> Result<(), std::io::Error> {
    let dir = env::current_dir().unwrap();
    let file_handler = dir.join(file_name);
    let mut file = File::create(file_handler).unwrap();
    file.write_all(buf)
}


/* 
async fn authn() {

}*/



#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();

    data::MAIN_CONFIG.version = "1.0".to_string();
    data::MAIN_CONFIG.mqtt_broker_address = "test".to_string();
    data::MAIN_CONFIG.wildcard = "#".to_string();
    data::MAIN_CONFIG.splitting_character = ".".to_string();
    data::MAIN_CONFIG.active_configs = [].to_vec();

    let ws_chat_server = ws_server::WsChatServer::default();
    let mut ws_chat_server_2 = ws_chat_server.clone();

    actix::Supervisor::start(|_| ws_chat_server);

    ws_server::WsChatServer::create_room("Main");

    let msg = serde_json::to_string_pretty(&data::MAIN_CONFIG).expect("Expected parsable string");
    
    task::spawn(async move {
        loop {
            match ws_chat_server_2.send_chat_message("Main", &msg.clone(), 0) {
                Some(()) => (),//log::debug!("Got a result from sending chat message"),
                None => (),//log::debug!("Got no result from sending chat message"),
            }
            
            sleep(Duration::from_secs(1));
        }        
    });


    HttpServer::new(move|| App::new()
        .wrap(Logger::default())
        .wrap(Cors::default().allow_any_origin().allow_any_header().allow_any_method())
        .service(actions::get_json)
        .service(actions::get_protobuf)
        .service(actions::start_ws_connection)
    )
    .bind(("127.0.0.1", 3000))?
    .workers(2)
    .run().await


}