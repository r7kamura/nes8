import DmaController from "./dmaController";
import Ppu from "./ppu";
import Ram from "./ram";
import Rom from "./rom";
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

  // @todo
  public write(address: Uint16, value: Uint8) {}
}
