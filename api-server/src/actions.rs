use actix_web::{get, HttpRequest, Responder};
use crate::data;


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

