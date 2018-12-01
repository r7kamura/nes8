import Cpu from "./cpu";
import CpuBus from "./cpuBus";
import DmaController from "./dmaController";
import InterruptLine from "./interruptLine";
import Ppu from "./ppu";
import PpuBus from "./ppuBus";
import Ram from "./ram";

export default class PartsFactory {
  _cpu?: Cpu;

  _cpuBus?: CpuBus;

  _characterRam?: Ram;

  _dmaController?: DmaController;

  _interruptLine?: InterruptLine;

  _ppu?: Ppu;

  _ppuBus?: PpuBus;

  _videoRam?: Ram;

  _workingRam?: Ram;

  characterRam(): Ram {
    return this._characterRam || (this._characterRam = new Ram(4096));
  }

  cpu(): Cpu {
    return (
      this._cpu || (this._cpu = new Cpu(this.cpuBus(), this.interruptLine()))
    );
  }

  cpuBus(): CpuBus {
    return (
      this._cpuBus ||
      (this._cpuBus = new CpuBus(
        this.dmaController(),
        this.ppu(),
        this.workingRam()
      ))
    );
  }

  dmaController(): DmaController {
    return (
      this._dmaController ||
      (this._dmaController = new DmaController(this.ppu(), this.workingRam()))
    );
  }

  interruptLine(): InterruptLine {
    return this._interruptLine || (this._interruptLine = new InterruptLine());
  }

  ppu(): Ppu {
    return (
      this._ppu || (this._ppu = new Ppu(this.ppuBus(), this.interruptLine()))
    );
  }

  ppuBus(): PpuBus {
    return (
      this._ppuBus ||
      (this._ppuBus = new PpuBus(this.characterRam(), this.videoRam()))
    );
  }

  videoRam(): Ram {
    return this._videoRam || (this._videoRam = new Ram(8192));
  }

  workingRam(): Ram {
    return this._workingRam || (this._workingRam = new Ram(2048));
  }
}
