import Ram from "./Ram";
import Rom from "./Rom";
import { Uint16, Uint8 } from "./types";

export default class PpuBus {
  constructor(public characterRam: Ram, public videoRam: Ram) {}

  set characterRom(characterRom: Rom) {
    for (let i = 0; i < characterRom.bytesize; i++) {
      this.characterRam.write(i, characterRom.read(i));
    }
  }

  // @todo
  public read(address: Uint16): Uint8 {
    return 0;
  }

  // @todo
  public write(address: Uint16, value: Uint8) {
    // TODO
  }
}
