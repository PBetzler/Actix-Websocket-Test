use actix_web::{get, HttpRequest, HttpResponse, Responder, web, Error};
use crate::data;
use crate::ws_clients::WsConn;
use actix_web_actors::ws;



#[get("/json")]
pub async fn get_json(_req: HttpRequest) -> impl Responder {
    //let encoded_config = data::serialize(&data::MAIN_CONFIG);
    //encoded_config
    let json = serde_json::to_string_pretty(&data::MAIN_CONFIG).expect("Expected parsable string");
    json
}

#[get("/protobuf")]
pub async fn get_protobuf(_req: HttpRequest) -> impl Responder {
    let encoded_config = data::serialize(&data::MAIN_CONFIG);
    encoded_config
}

#[get("/ws")]
pub async fn start_ws_connection(
    req: HttpRequest,
    stream: web::Payload,
) -> Result<HttpResponse, Error> {    

    let resp = ws::start(WsConn::default(), &req, stream)?;
    Ok(resp)
}