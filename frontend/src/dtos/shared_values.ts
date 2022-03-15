/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.1
 * source: shared_values.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace dbos {
    export enum ConfigType {
        NOT_SET = 0,
        MAIN_CONFIG = 1,
        MACHINE_ID_CONFIG = 2,
        MACHINE_TYPE_CONFIG = 3,
        PRODUCTION_LINE_CONFIG = 4,
        COMPLETE_CONFIG = 5
    }
    export class MqttId extends pb_1.Message {
        constructor(data?: any[] | ({
            position?: string;
        } & (({
            existence_check?: boolean;
            value_check?: never;
        } | {
            existence_check?: never;
            value_check?: MqttValueCheck;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[2, 3]]);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("position" in data && data.position != undefined) {
                    this.position = data.position;
                }
                if ("existence_check" in data && data.existence_check != undefined) {
                    this.existence_check = data.existence_check;
                }
                if ("value_check" in data && data.value_check != undefined) {
                    this.value_check = data.value_check;
                }
            }
        }
        get position() {
            return pb_1.Message.getField(this, 1) as string;
        }
        set position(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get existence_check() {
            return pb_1.Message.getField(this, 2) as boolean;
        }
        set existence_check(value: boolean) {
            pb_1.Message.setOneofField(this, 2, [2, 3], value);
        }
        get value_check() {
            return pb_1.Message.getWrapperField(this, MqttValueCheck, 3) as MqttValueCheck;
        }
        set value_check(value: MqttValueCheck) {
            pb_1.Message.setOneofWrapperField(this, 3, [2, 3], value);
        }
        get mqtt_id_check() {
            const cases: {
                [index: number]: "none" | "existence_check" | "value_check";
            } = {
                0: "none",
                2: "existence_check",
                3: "value_check"
            };
            return cases[pb_1.Message.computeOneofCase(this, [2, 3])];
        }
        static fromObject(data: {
            position?: string;
            existence_check?: boolean;
            value_check?: ReturnType<typeof MqttValueCheck.prototype.toObject>;
        }) {
            const message = new MqttId({});
            if (data.position != null) {
                message.position = data.position;
            }
            if (data.existence_check != null) {
                message.existence_check = data.existence_check;
            }
            if (data.value_check != null) {
                message.value_check = MqttValueCheck.fromObject(data.value_check);
            }
            return message;
        }
        toObject() {
            const data: {
                position?: string;
                existence_check?: boolean;
                value_check?: ReturnType<typeof MqttValueCheck.prototype.toObject>;
            } = {};
            if (this.position != null) {
                data.position = this.position;
            }
            if (this.existence_check != null) {
                data.existence_check = this.existence_check;
            }
            if (this.value_check != null) {
                data.value_check = this.value_check.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.position === "string" && this.position.length)
                writer.writeString(1, this.position);
            if (this.existence_check !== undefined)
                writer.writeBool(2, this.existence_check);
            if (this.value_check !== undefined)
                writer.writeMessage(3, this.value_check, () => this.value_check.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MqttId {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MqttId();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.position = reader.readString();
                        break;
                    case 2:
                        message.existence_check = reader.readBool();
                        break;
                    case 3:
                        reader.readMessage(message.value_check, () => message.value_check = MqttValueCheck.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): MqttId {
            return MqttId.deserialize(bytes);
        }
    }
    export class MqttValueCheck extends pb_1.Message {
        constructor(data?: any[] | ({
            value_check?: boolean;
        } & (({
            value_equals_id_or_name?: boolean;
            value?: never;
        } | {
            value_equals_id_or_name?: never;
            value?: string;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[2, 3]]);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("value_check" in data && data.value_check != undefined) {
                    this.value_check = data.value_check;
                }
                if ("value_equals_id_or_name" in data && data.value_equals_id_or_name != undefined) {
                    this.value_equals_id_or_name = data.value_equals_id_or_name;
                }
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
            }
        }
        get value_check() {
            return pb_1.Message.getField(this, 1) as boolean;
        }
        set value_check(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get value_equals_id_or_name() {
            return pb_1.Message.getField(this, 2) as boolean;
        }
        set value_equals_id_or_name(value: boolean) {
            pb_1.Message.setOneofField(this, 2, [2, 3], value);
        }
        get value() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set value(value: string) {
            pb_1.Message.setOneofField(this, 3, [2, 3], value);
        }
        get value_to_check() {
            const cases: {
                [index: number]: "none" | "value_equals_id_or_name" | "value";
            } = {
                0: "none",
                2: "value_equals_id_or_name",
                3: "value"
            };
            return cases[pb_1.Message.computeOneofCase(this, [2, 3])];
        }
        static fromObject(data: {
            value_check?: boolean;
            value_equals_id_or_name?: boolean;
            value?: string;
        }) {
            const message = new MqttValueCheck({});
            if (data.value_check != null) {
                message.value_check = data.value_check;
            }
            if (data.value_equals_id_or_name != null) {
                message.value_equals_id_or_name = data.value_equals_id_or_name;
            }
            if (data.value != null) {
                message.value = data.value;
            }
            return message;
        }
        toObject() {
            const data: {
                value_check?: boolean;
                value_equals_id_or_name?: boolean;
                value?: string;
            } = {};
            if (this.value_check != null) {
                data.value_check = this.value_check;
            }
            if (this.value_equals_id_or_name != null) {
                data.value_equals_id_or_name = this.value_equals_id_or_name;
            }
            if (this.value != null) {
                data.value = this.value;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.value_check !== undefined)
                writer.writeBool(1, this.value_check);
            if (this.value_equals_id_or_name !== undefined)
                writer.writeBool(2, this.value_equals_id_or_name);
            if (typeof this.value === "string" && this.value.length)
                writer.writeString(3, this.value);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MqttValueCheck {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MqttValueCheck();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.value_check = reader.readBool();
                        break;
                    case 2:
                        message.value_equals_id_or_name = reader.readBool();
                        break;
                    case 3:
                        message.value = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): MqttValueCheck {
            return MqttValueCheck.deserialize(bytes);
        }
    }
}
