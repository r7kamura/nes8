import Ppu from "./Ppu";
import Ram from "./Ram";

export default class DmaController {
  constructor(private ppu: Ppu, private workingRam: Ram) {}

  public transferIfRequested() {
    // TODO
  }
}
