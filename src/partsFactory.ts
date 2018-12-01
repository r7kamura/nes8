import Cpu from "./cpu";
import CpuBus from "./cpuBus";
import DmaController from "./dmaController";
import InterruptLine from "./interruptLine";
import Ppu from "./ppu";
import PpuBus from "./ppuBus";
import Ram from "./ram";

export default class PartsFactory {
  public _cpu?: Cpu;

  public _cpuBus?: CpuBus;

  public _characterRam?: Ram;

  public _dmaController?: DmaController;

  public _interruptLine?: InterruptLine;

  public _ppu?: Ppu;

  public _ppuBus?: PpuBus;

  public _videoRam?: Ram;

  public _workingRam?: Ram;

  public characterRam(): Ram {
    return this._characterRam || (this._characterRam = new Ram(4096));
  }

  public cpu(): Cpu {
    return (
      this._cpu || (this._cpu = new Cpu(this.cpuBus(), this.interruptLine()))
    );
  }

  public cpuBus(): CpuBus {
    return (
      this._cpuBus ||
      (this._cpuBus = new CpuBus(
        this.dmaController(),
        this.ppu(),
        this.workingRam()
      ))
    );
  }

  public dmaController(): DmaController {
    return (
      this._dmaController ||
      (this._dmaController = new DmaController(this.ppu(), this.workingRam()))
    );
  }

  public interruptLine(): InterruptLine {
    return this._interruptLine || (this._interruptLine = new InterruptLine());
  }

  public ppu(): Ppu {
    return (
      this._ppu || (this._ppu = new Ppu(this.ppuBus(), this.interruptLine()))
    );
  }

  public ppuBus(): PpuBus {
    return (
      this._ppuBus ||
      (this._ppuBus = new PpuBus(this.characterRam(), this.videoRam()))
    );
  }

  public videoRam(): Ram {
    return this._videoRam || (this._videoRam = new Ram(8192));
  }

  public workingRam(): Ram {
    return this._workingRam || (this._workingRam = new Ram(2048));
  }
}
