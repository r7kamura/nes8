import Ram from './ram';
import Rom from './rom';
import { Uint8, Uint16 } from './types';

export default class PpuBus {
  constructor(
    public characterRam: Ram,
    public videoRam: Ram
  ) {}

  set characterRom(characterRom: Rom) {
    for (let i = 0; i < characterRom.bytesize; i++) {
        this.characterRam.write(i, characterRom.read(i));
    }
  }

  // @todo
  read(address: Uint16): Uint8 {
    return 0;
  }

  // @todo
  write(address: Uint16, value: Uint8) {}
}
