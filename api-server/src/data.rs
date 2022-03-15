use prost::bytes::Bytes;
use prost::Message;

use crate::protobuf_messages;


pub const MAIN_CONFIG : protobuf_messages::dbos::MainConfig = protobuf_messages::dbos::MainConfig{
    version:  String::new(),
    config_type: protobuf_messages::dbos::ConfigType::MainConfig as i32,
    mqtt_broker_address: String::new(),
    wildcard: String::new(),
    splitting_character: String::new(),
    active_configs: Vec::new(),
};

pub fn serialize(object: &impl prost::Message) -> Vec<u8> {
    let mut buf = Vec::new();
    buf.reserve(object.encoded_len());
    object.encode(&mut buf).unwrap();
    buf
}

pub fn deserialize_config_main(buf: &[u8]) -> Result<protobuf_messages::dbos::MainConfig, prost::DecodeError> {
    protobuf_messages::dbos::MainConfig::decode(&mut Bytes::copy_from_slice(buf))
}