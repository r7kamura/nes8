import InterruptLine from "./InterruptLine";
import PpuBus from "./PpuBus";
import { Uint16, Uint8 } from "./types";

export default class Ppu {
  constructor(private bus: PpuBus, private interruptLine: InterruptLine) {}

  // @todo
  public read(address: Uint16): Uint8 {
    return 0;
  }

  public step() {
    // TODO
  }

  public write(address: Uint16, value: Uint8) {
    // TODO
  }
}
