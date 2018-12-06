import { Uint8 } from "./types";

export default class Image {
  private colorCodes: Uint8[];

  constructor(private width: number, private height: number) {
    this.colorCodes = new Array(width * height).fill(0);
  }

  public read(x: number, y: number): Uint8 {
    return this.colorCodes[this.width * y + x];
  }

  public write(x: number, y: number, value: Uint8) {
    this.colorCodes[this.width * y + x] = value;
  }
}
