import typescriptLogo from "/typescript.svg";
import logo from "/typecomposer.svg";
import { BorderPanel, ButtonElement, H1Element, HBox, ImageElement, VBox } from "typecomposer";
import "./style.css";

export class AppPage extends BorderPanel {
  private count: number = 0;

  constructor() {
    super();
    const vbox = new VBox({ className: "flex flex-col justify-center gap-5" });
    const images = new HBox({ className: "flex w-full items-center justify-center" });
    images.append(new ImageElement({ src: logo, className: "logo" }));
    images.append(new ImageElement({ src: typescriptLogo, className: "logo" }));
    vbox.append(images);
    vbox.append(new H1Element({ text: "TypeComposer", className: "text-center text-[#fcfffa]" }));
    const counter = new ButtonElement({ text: "0", className: "bg-green-700 w-[35%] h-[50px] self-center" });
    counter.onclick = () => (counter.innerHTML = (this.count++).toString());
    vbox.append(counter);
    this.center = vbox;
  }
}
