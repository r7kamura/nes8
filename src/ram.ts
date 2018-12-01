import { Uint8, Uint16 } from './types';

export default class Ram {
  bytes: Uint8Array;

  constructor(bytesize: number) {
    this.bytes = new Uint8Array(bytesize);
  }

  read(address: Uint16): Uint8 {
    return this.bytes[address];
  }

  write(address: Uint16, value: Uint8) {
    return this.bytes[address] = value;
  }
}
