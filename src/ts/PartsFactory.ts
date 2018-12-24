import CanvasRenderer from "./CanvasRenderer";
import Cpu from "./Cpu";
import CpuBus from "./CpuBus";
import DmaController from "./DmaController";
import InterruptLine from "./InterruptLine";
import IRenderer from "./IRenderer";
import Keypad from "./Keypad";
import Ppu from "./Ppu";
import PpuBus from "./PpuBus";
import Ram from "./Ram";
import TerminalRenderer from "./TerminalRenderer";

const KEYS1 = [190, 188, 78, 77, 87, 83, 65, 87];

// TODO
const KEYS2 = [190, 188, 78, 77, 87, 83, 65, 87];

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

  public cachedRenderer?: IRenderer;

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
    return this.cachedKeypad1 || (this.cachedKeypad1 = new Keypad(KEYS1));
  }

  public keypad2(): Keypad {
    return this.cachedKeypad2 || (this.cachedKeypad2 = new Keypad(KEYS2));
  }

  public ppu(): Ppu {
    return (
      this.cachedPpu ||
      (this.cachedPpu = new Ppu(
        this.ppuBus(),
        this.interruptLine(),
        this.renderer()
      ))
    );
  }

  public ppuBus(): PpuBus {
    return (
      this.cachedPpuBus ||
      (this.cachedPpuBus = new PpuBus(this.characterRam(), this.videoRam()))
    );
  }

  public renderer(): IRenderer {
    return (
      this.cachedRenderer || (this.cachedRenderer = this.constructRenderer())
    );
  }

  public videoRam(): Ram {
    return this.cachedVideoRam || (this.cachedVideoRam = new Ram(8192));
  }

  public workingRam(): Ram {
    return this.cachedWorkingRam || (this.cachedWorkingRam = new Ram(2048));
  }

  private constructRenderer(): IRenderer {
    return typeof window === "undefined"
      ? new TerminalRenderer()
      : new CanvasRenderer(this.findCanvasContext());
  }

  private findCanvasContext(): CanvasRenderingContext2D {
    const element = document.getElementsByTagName("canvas")[0];
    if (!element) {
      throw new Error("HTML canvas element not found");
    } else {
      const canvasContext = element.getContext("2d");
      if (canvasContext) {
        return canvasContext;
      } else {
        throw new Error("Canvas context not found");
      }
    }
  }
}
