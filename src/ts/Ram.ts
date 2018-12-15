import { Uint16, Uint8 } from "./types";

export default class Ram {
  public bytes: Uint8Array;

  constructor(bytesize: number) {
    this.bytes = new Uint8Array(bytesize);
  }

  public read(address: Uint16): Uint8 {
    return this.bytes[address];
  }

  public write(address: Uint16, value: Uint8) {
    this.bytes[address] = value;
  }
}
