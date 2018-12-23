import { Uint8 } from "./types";

interface IKeyMap {
  [key: string]: number;
}

export default class Keypad {
  private buffer: number;

  private copy: number;

  private index: number;

  private keyMap: IKeyMap;

  private latch: boolean;

  constructor(keys: number[]) {
    this.buffer = 0;
    this.copy = 0;
    this.index = 0;
    this.latch = false;
    this.keyMap = keys.reduce(
      (accumulator: IKeyMap, key: number, index: number) => {
        accumulator[key] = index;
        return accumulator;
      },
      {}
    );
  }

  public onKeyDown = (event: KeyboardEvent) => {
    const index = this.keyMap[event.keyCode];
    if (index) {
      this.buffer |= 1 << index;
    }
  };

  public read(): Uint8 {
    const value = this.copy & (1 << this.index) ? 1 : 0;
    this.index = (this.index + 1) & 0x0f;
    return value;
  }

  public write(value: Uint8) {
    if (value & 1) {
      this.latch = true;
    } else {
      this.latch = false;
      this.copy = this.buffer;
      this.buffer = 0;
      this.index = 0;
    }
  }
}
