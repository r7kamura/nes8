import Ppu from "./Ppu";
import Ram from "./Ram";
import { Uint8 } from "./types";

export default class DmaController {
  constructor(private ppu: Ppu, private workingRam: Ram) {}

  public requestTransfer(addressHint: Uint8) {
    // TODO
  }

  public transferIfRequested() {
    // TODO
  }
}
