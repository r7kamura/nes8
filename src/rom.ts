import { Uint8, Uint16 } from './types';

export default class Rom {
  constructor(private bytes: Uint8Array) {}

  get bytesize(): number {
    return this.bytes.length;
  }

  read(address: Uint16): Uint8 {
    return this.bytes[address];
  }
}
