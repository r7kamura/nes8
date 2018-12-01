import DmaController from "./DmaController";
import Ppu from "./Ppu";
import Ram from "./Ram";
import Rom from "./Rom";
import { Uint16, Uint8 } from "./types";

export default class CpuBus {
  public programRom?: Rom;

  constructor(
    private dmaController: DmaController,
    private ppu: Ppu,
    private workingRam: Ram
  ) {}

  // @todo
  public read(address: Uint16): Uint8 {
    return 0;
  }

  public write(address: Uint16, value: Uint8) {
    // TODO
  }
}
