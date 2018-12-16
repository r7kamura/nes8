import colors from "./colors";
import Image from "./Image";
import RgbaIndex from "./RgbaIndex";
import { Rgb } from "./types";

const ALPHA = 0xff;

const WINDOW_WIDTH = 256;
const WINDOW_HEIGHT = 240;

export default class CanvasRenderer {
  private imageData: ImageData;

  constructor(private canvasContext: CanvasRenderingContext2D) {
    this.imageData = this.canvasContext.createImageData(
      WINDOW_WIDTH,
      WINDOW_HEIGHT
    );
  }

  public render(image: Image) {
    this.drawPixels(image);
    this.updateCanvas();
  }

  private drawPixel(index: number, rgb: Rgb) {
    this.imageData.data[index + RgbaIndex.Red] = rgb[RgbaIndex.Red];
    this.imageData.data[index + RgbaIndex.Green] = rgb[RgbaIndex.Green];
    this.imageData.data[index + RgbaIndex.Blue] = rgb[RgbaIndex.Blue];
    this.imageData.data[index + RgbaIndex.Alpha] = ALPHA;
  }

  private drawPixels(image: Image) {
    for (let y = 0; y < image.height; y++) {
      const offset = image.height * y;
      for (let x = 0; x < image.width; x++) {
        this.drawPixel(offset + x, colors[image.read(x, y)]);
      }
    }
  }

  private updateCanvas() {
    this.canvasContext.putImageData(this.imageData, 0, 0);
  }
}
