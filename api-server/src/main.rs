use std::time::Duration;
use std::{env, thread::sleep};
use std::fs::File;
use std::io::Write;
use actix_web::{App, HttpServer, middleware::Logger};
use actix_cors::Cors;
use actix::Actor;
use tokio::task;


pub mod protobuf_messages;
pub mod actions;
pub mod data;
pub mod web_sockets;
pub mod messages;
pub mod start_connection;
pub mod lobby;

use lobby::Lobby;
use start_connection::start_connection as start_connection_route;

pub async fn write_to_file(buf: &[u8], file_name: &str) -> Result<(), std::io::Error> {
    let dir = env::current_dir().unwrap();
    let file_handler = dir.join(file_name);
    let mut file = File::create(file_handler).unwrap();
    file.write_all(buf)
}


async fn authn() {

}



#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    data::MAIN_CONFIG.version = "1.0".to_string();
    data::MAIN_CONFIG.mqtt_broker_address = "test".to_string();
    data::MAIN_CONFIG.wildcard = "#".to_string();
    data::MAIN_CONFIG.splitting_character = ".".to_string();
    data::MAIN_CONFIG.active_configs = [].to_vec();

    let lobby = Lobby::default();
    let chat_server = lobby.start();
    let chat_server_2 = chat_server.clone();

    let server = HttpServer::new(move|| App::new()
        .wrap(Logger::default())
        .wrap(Cors::default().allow_any_origin().allow_any_header().allow_any_method())
        .service(actions::get_json)
        .service(actions::get_protobuf)
        .service(start_connection_route)
        .app_data(chat_server.clone())
    )
    .bind(("127.0.0.1", 3000))?
    .run();

    let msg = messages::WsMessage (serde_json::to_string_pretty(&data::MAIN_CONFIG).expect("Expected parsable string"));
    
    task::spawn(async move {
        loop {
            chat_server_2.send(msg.clone()).await.expect("Couldnt send ws message!");
            sleep(Duration::from_secs(1));
        }        
    });

    server.await  

}