import Image from "./Image";

export default interface IRenderer {
  render(image: Image): void;
}
