export default class InesHeader {
  constructor(private bytes: Uint8Array) {}

  public byteSize(): number {
    return 16;
  }

  public characterRomByteSize(): number {
    return this.bytes[5] * 8192;
  }

  public programRomByteSize(): number {
    return this.bytes[4] * 16384;
  }

  public trainerByteSize(): number {
    return this.hasTrainer() ? 512 : 0;
  }

  private hasTrainer(): boolean {
    return (this.bytes[6] & (1 << 2)) === 1;
  }
}
