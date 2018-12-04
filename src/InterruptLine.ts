export default class InterruptLine {
  public irq: boolean;
  public nmi: boolean;

  constructor() {
    this.irq = false;
    this.nmi = false;
  }
}
