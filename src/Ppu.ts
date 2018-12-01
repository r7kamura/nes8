import InterruptLine from "./InterruptLine";
import PpuBus from "./PpuBus";

export default class Ppu {
  constructor(private bus: PpuBus, private interruptLine: InterruptLine) {}

  public step() {
    // TODO
  }
}
