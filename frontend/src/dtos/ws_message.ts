/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.14.0
 * source: ws_message.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./google/protobuf/timestamp";
import * as pb_1 from "google-protobuf";
export namespace dtos {
    export class DataMessage extends pb_1.Message {
        constructor(data?: any[] | {
            machine_id?: string;
            parameter_name?: string;
            parameter_value?: string;
            parameter_timestamp?: dependency_1.google.protobuf.Timestamp;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("machine_id" in data && data.machine_id != undefined) {
                    this.machine_id = data.machine_id;
                }
                if ("parameter_name" in data && data.parameter_name != undefined) {
                    this.parameter_name = data.parameter_name;
                }
                if ("parameter_value" in data && data.parameter_value != undefined) {
                    this.parameter_value = data.parameter_value;
                }
                if ("parameter_timestamp" in data && data.parameter_timestamp != undefined) {
                    this.parameter_timestamp = data.parameter_timestamp;
                }
            }
        }
        get machine_id() {
            return pb_1.Message.getField(this, 1) as string;
        }
        set machine_id(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get parameter_name() {
            return pb_1.Message.getField(this, 2) as string;
        }
        set parameter_name(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get parameter_value() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set parameter_value(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get parameter_timestamp() {
            return pb_1.Message.getWrapperField(this, dependency_1.google.protobuf.Timestamp, 4) as dependency_1.google.protobuf.Timestamp;
        }
        set parameter_timestamp(value: dependency_1.google.protobuf.Timestamp) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        static fromObject(data: {
            machine_id?: string;
            parameter_name?: string;
            parameter_value?: string;
            parameter_timestamp?: ReturnType<typeof dependency_1.google.protobuf.Timestamp.prototype.toObject>;
        }) {
            const message = new DataMessage({});
            if (data.machine_id != null) {
                message.machine_id = data.machine_id;
            }
            if (data.parameter_name != null) {
                message.parameter_name = data.parameter_name;
            }
            if (data.parameter_value != null) {
                message.parameter_value = data.parameter_value;
            }
            if (data.parameter_timestamp != null) {
                message.parameter_timestamp = dependency_1.google.protobuf.Timestamp.fromObject(data.parameter_timestamp);
            }
            return message;
        }
        toObject() {
            const data: {
                machine_id?: string;
                parameter_name?: string;
                parameter_value?: string;
                parameter_timestamp?: ReturnType<typeof dependency_1.google.protobuf.Timestamp.prototype.toObject>;
            } = {};
            if (this.machine_id != null) {
                data.machine_id = this.machine_id;
            }
            if (this.parameter_name != null) {
                data.parameter_name = this.parameter_name;
            }
            if (this.parameter_value != null) {
                data.parameter_value = this.parameter_value;
            }
            if (this.parameter_timestamp != null) {
                data.parameter_timestamp = this.parameter_timestamp.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.machine_id === "string" && this.machine_id.length)
                writer.writeString(1, this.machine_id);
            if (typeof this.parameter_name === "string" && this.parameter_name.length)
                writer.writeString(2, this.parameter_name);
            if (typeof this.parameter_value === "string" && this.parameter_value.length)
                writer.writeString(3, this.parameter_value);
            if (this.parameter_timestamp !== undefined)
                writer.writeMessage(4, this.parameter_timestamp, () => this.parameter_timestamp.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DataMessage {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DataMessage();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.machine_id = reader.readString();
                        break;
                    case 2:
                        message.parameter_name = reader.readString();
                        break;
                    case 3:
                        message.parameter_value = reader.readString();
                        break;
                    case 4:
                        reader.readMessage(message.parameter_timestamp, () => message.parameter_timestamp = dependency_1.google.protobuf.Timestamp.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): DataMessage {
            return DataMessage.deserialize(bytes);
        }
    }
}
