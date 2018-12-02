import Cpu from "./Cpu";
import CpuBus from "./CpuBus";
import DmaController from "./DmaController";
import InterruptLine from "./InterruptLine";
import Keypad from "./Keypad";
import Ppu from "./Ppu";
import PpuBus from "./PpuBus";
import Ram from "./Ram";

export default class PartsFactory {
  public cachedCpu?: Cpu;

  public cachedCpuBus?: CpuBus;

  public cachedCharacterRam?: Ram;

  public cachedDmaController?: DmaController;

  public cachedInterruptLine?: InterruptLine;

  public cachedKeypad1?: Keypad;

  public cachedKeypad2?: Keypad;

  public cachedPpu?: Ppu;

  public cachedPpuBus?: PpuBus;

  public cachedVideoRam?: Ram;

  public cachedWorkingRam?: Ram;

  public characterRam(): Ram {
    return this.cachedCharacterRam || (this.cachedCharacterRam = new Ram(4096));
  }

  public cpu(): Cpu {
    return (
      this.cachedCpu ||
      (this.cachedCpu = new Cpu(this.cpuBus(), this.interruptLine()))
    );
  }

  public cpuBus(): CpuBus {
    return (
      this.cachedCpuBus ||
      (this.cachedCpuBus = new CpuBus(
        this.dmaController(),
        this.keypad1(),
        this.keypad2(),
        this.ppu(),
        this.workingRam()
      ))
    );
  }

  public dmaController(): DmaController {
    return (
      this.cachedDmaController ||
      (this.cachedDmaController = new DmaController(
        this.ppu(),
        this.workingRam()
      ))
    );
  }

  public interruptLine(): InterruptLine {
    return (
      this.cachedInterruptLine ||
      (this.cachedInterruptLine = new InterruptLine())
    );
  }

  public keypad1(): Keypad {
    return this.cachedKeypad1 || (this.cachedKeypad1 = new Keypad());
  }

  public keypad2(): Keypad {
    return this.cachedKeypad2 || (this.cachedKeypad2 = new Keypad());
  }

  public ppu(): Ppu {
    return (
      this.cachedPpu ||
      (this.cachedPpu = new Ppu(this.ppuBus(), this.interruptLine()))
    );
  }

  public ppuBus(): PpuBus {
    return (
      this.cachedPpuBus ||
      (this.cachedPpuBus = new PpuBus(this.characterRam(), this.videoRam()))
    );
  }

  public videoRam(): Ram {
    return this.cachedVideoRam || (this.cachedVideoRam = new Ram(8192));
  }

  public workingRam(): Ram {
    return this.cachedWorkingRam || (this.cachedWorkingRam = new Ram(2048));
  }
}
