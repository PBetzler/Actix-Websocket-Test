extern crate prost_build;

use std::{env, path::PathBuf};
use prost_wkt_build::*;


// executing protobuf compilation
fn main() {

    let out = PathBuf::from(env::var("OUT_DIR").unwrap());
    let descriptor_file = out.join("descriptors.bin");
    let mut prost_build = prost_build::Config::new();
    prost_build
        // adding line "use serde::{Serialize,Deserialize};" to matching protobuf path (package + message!)
        // the first three ..type_attribute() calls specifically target the first entries in the compiled files
        // and add the necessary import statement "use serde::{Serialize,Deserialize};"
        // The first entries were looked up manually and are luckily stable in order.
        .type_attribute(        
            ".dbos.MqttId",
            "use serde::{Serialize,Deserialize};"
        ) 
        .type_attribute(
            ".dtos.Machines",
            "use serde::{Serialize,Deserialize};"
        )
        .type_attribute(
            ".universal.Position",
            "use serde::{Serialize,Deserialize};"
        )
        // adding necessary inline "use serde::{Serialize,Deserialize};" statement
        .type_attribute(
            ".dbos.MqttValueCheck.value_to_check",
            "use serde::{Serialize,Deserialize};"
        )
        // adding to all protobuf messages the line "#[derive(Serialize, Deserialize)]" to enable serde transformation
        .type_attribute(
            ".",
            "#[derive(Serialize, Deserialize)]"
        )
        .extern_path(
            ".google.protobuf.Any",
            "::prost_wkt_types::Any"
        )
        .extern_path(
            ".google.protobuf.Timestamp",
            "::prost_wkt_types::Timestamp"
        )
        .extern_path(
            ".google.protobuf.Value",
            "::prost_wkt_types::Value"
        )
        .file_descriptor_set_path(&descriptor_file)
        .compile_protos(&["../protobuf/*"],
        &["../protobuf/"]).unwrap();

    let descriptor_bytes = std::fs::read(descriptor_file).unwrap();

    let descriptor = FileDescriptorSet::decode(&descriptor_bytes[..]).unwrap();

    prost_wkt_build::add_serde(out, descriptor);
}