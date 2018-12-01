import { Uint16, Uint8 } from "./types";

export default class Rom {
  constructor(private bytes: Uint8Array) {}

  get bytesize(): number {
    return this.bytes.length;
  }

  public read(address: Uint16): Uint8 {
    return this.bytes[address];
  }
}
