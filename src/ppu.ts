import InterruptLine from "./interruptLine";
import PpuBus from "./ppuBus";

export default class Ppu {
  constructor(private bus: PpuBus, private interruptLine: InterruptLine) {}

  public step() {
    // TODO
  }
}
