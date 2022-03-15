/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.1
 * source: production_line.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./helper";
import * as dependency_2 from "./shared_values";
import * as pb_1 from "google-protobuf";
export namespace dbos {
    export class ProductionLine extends pb_1.Message {
        constructor(data?: any[] | {
            version?: string;
            config_type?: dependency_2.dbos.ConfigType;
            id?: string;
            machines_reduced?: ViewElementMachine[];
            image?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("version" in data && data.version != undefined) {
                    this.version = data.version;
                }
                if ("config_type" in data && data.config_type != undefined) {
                    this.config_type = data.config_type;
                }
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("machines_reduced" in data && data.machines_reduced != undefined) {
                    this.machines_reduced = data.machines_reduced;
                }
                if ("image" in data && data.image != undefined) {
                    this.image = data.image;
                }
            }
        }
        get version() {
            return pb_1.Message.getField(this, 1) as string;
        }
        set version(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get config_type() {
            return pb_1.Message.getField(this, 2) as dependency_2.dbos.ConfigType;
        }
        set config_type(value: dependency_2.dbos.ConfigType) {
            pb_1.Message.setField(this, 2, value);
        }
        get id() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set id(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get machines_reduced() {
            return pb_1.Message.getRepeatedWrapperField(this, ViewElementMachine, 4) as ViewElementMachine[];
        }
        set machines_reduced(value: ViewElementMachine[]) {
            pb_1.Message.setRepeatedWrapperField(this, 4, value);
        }
        get image() {
            return pb_1.Message.getField(this, 5) as string;
        }
        set image(value: string) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data: {
            version?: string;
            config_type?: dependency_2.dbos.ConfigType;
            id?: string;
            machines_reduced?: ReturnType<typeof ViewElementMachine.prototype.toObject>[];
            image?: string;
        }) {
            const message = new ProductionLine({});
            if (data.version != null) {
                message.version = data.version;
            }
            if (data.config_type != null) {
                message.config_type = data.config_type;
            }
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.machines_reduced != null) {
                message.machines_reduced = data.machines_reduced.map(item => ViewElementMachine.fromObject(item));
            }
            if (data.image != null) {
                message.image = data.image;
            }
            return message;
        }
        toObject() {
            const data: {
                version?: string;
                config_type?: dependency_2.dbos.ConfigType;
                id?: string;
                machines_reduced?: ReturnType<typeof ViewElementMachine.prototype.toObject>[];
                image?: string;
            } = {};
            if (this.version != null) {
                data.version = this.version;
            }
            if (this.config_type != null) {
                data.config_type = this.config_type;
            }
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.machines_reduced != null) {
                data.machines_reduced = this.machines_reduced.map((item: ViewElementMachine) => item.toObject());
            }
            if (this.image != null) {
                data.image = this.image;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.version === "string" && this.version.length)
                writer.writeString(1, this.version);
            if (this.config_type !== undefined)
                writer.writeEnum(2, this.config_type);
            if (typeof this.id === "string" && this.id.length)
                writer.writeString(3, this.id);
            if (this.machines_reduced !== undefined)
                writer.writeRepeatedMessage(4, this.machines_reduced, (item: ViewElementMachine) => item.serialize(writer));
            if (typeof this.image === "string" && this.image.length)
                writer.writeString(5, this.image);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProductionLine {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProductionLine();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.version = reader.readString();
                        break;
                    case 2:
                        message.config_type = reader.readEnum();
                        break;
                    case 3:
                        message.id = reader.readString();
                        break;
                    case 4:
                        reader.readMessage(message.machines_reduced, () => pb_1.Message.addToRepeatedWrapperField(message, 4, ViewElementMachine.deserialize(reader), ViewElementMachine));
                        break;
                    case 5:
                        message.image = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ProductionLine {
            return ProductionLine.deserialize(bytes);
        }
    }
    export class ViewElementMachine extends pb_1.Message {
        constructor(data?: any[] | {
            machine_id?: string;
            position?: dependency_1.universal.Position;
            size?: dependency_1.universal.Size;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("machine_id" in data && data.machine_id != undefined) {
                    this.machine_id = data.machine_id;
                }
                if ("position" in data && data.position != undefined) {
                    this.position = data.position;
                }
                if ("size" in data && data.size != undefined) {
                    this.size = data.size;
                }
            }
        }
        get machine_id() {
            return pb_1.Message.getField(this, 1) as string;
        }
        set machine_id(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get position() {
            return pb_1.Message.getWrapperField(this, dependency_1.universal.Position, 2) as dependency_1.universal.Position;
        }
        set position(value: dependency_1.universal.Position) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get size() {
            return pb_1.Message.getWrapperField(this, dependency_1.universal.Size, 3) as dependency_1.universal.Size;
        }
        set size(value: dependency_1.universal.Size) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        static fromObject(data: {
            machine_id?: string;
            position?: ReturnType<typeof dependency_1.universal.Position.prototype.toObject>;
            size?: ReturnType<typeof dependency_1.universal.Size.prototype.toObject>;
        }) {
            const message = new ViewElementMachine({});
            if (data.machine_id != null) {
                message.machine_id = data.machine_id;
            }
            if (data.position != null) {
                message.position = dependency_1.universal.Position.fromObject(data.position);
            }
            if (data.size != null) {
                message.size = dependency_1.universal.Size.fromObject(data.size);
            }
            return message;
        }
        toObject() {
            const data: {
                machine_id?: string;
                position?: ReturnType<typeof dependency_1.universal.Position.prototype.toObject>;
                size?: ReturnType<typeof dependency_1.universal.Size.prototype.toObject>;
            } = {};
            if (this.machine_id != null) {
                data.machine_id = this.machine_id;
            }
            if (this.position != null) {
                data.position = this.position.toObject();
            }
            if (this.size != null) {
                data.size = this.size.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.machine_id === "string" && this.machine_id.length)
                writer.writeString(1, this.machine_id);
            if (this.position !== undefined)
                writer.writeMessage(2, this.position, () => this.position.serialize(writer));
            if (this.size !== undefined)
                writer.writeMessage(3, this.size, () => this.size.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ViewElementMachine {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ViewElementMachine();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.machine_id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.position, () => message.position = dependency_1.universal.Position.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.size, () => message.size = dependency_1.universal.Size.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ViewElementMachine {
            return ViewElementMachine.deserialize(bytes);
        }
    }
}