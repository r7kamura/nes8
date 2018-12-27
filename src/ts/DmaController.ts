import Ppu from "./Ppu";
import Ram from "./Ram";
import { Uint16, Uint8 } from "./types";

export default class DmaController {
  private requested: boolean;

  private workingRamAddress: Uint16;

  constructor(private ppu: Ppu, private workingRam: Ram) {
    this.requested = false;
    this.workingRamAddress = 0x0000;
  }

  public requestTransfer(addressHint: Uint8) {
    this.requested = true;
    this.workingRamAddress = addressHint << 8;
  }

  public transferIfRequested() {
    if (this.requested) {
      this.transfer();
    }
  }

  private transfer() {
    for (let index = 0; index < 256; index++) {
      const value = this.workingRam.read(this.workingRamAddress + index);
      this.ppu.transferSpriteData(index, value);
    }
    this.requested = false;
  }
}
