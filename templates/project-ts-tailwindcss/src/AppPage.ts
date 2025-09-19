import { ButtonElement, Component, H1Element, HBox, ImageElement, ref, VBox } from "typecomposer";

export class AppPage extends Component {

  count = ref(0);

  constructor() {
    super({ style: { width: "100dvw", height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" } });
    const vbox = this.appendChild(new VBox({ className: "flex flex-col justify-center gap-5" }));
    const images = new HBox({ className: "flex w-full items-center justify-center" });
    images.append(new ImageElement({ src: "typescript.svg", className: "logo" }));
    images.append(new ImageElement({ src: "typecomposer.svg", className: "logo" }));
    vbox.append(new H1Element({ text: "TypeComposer", className: "text-center text-[#fcfffa]" }));
    vbox.append(images);
    vbox.append(new ButtonElement({ text: this.count, className: "bg-green-700 w-[35%] h-[50px] self-center", onclick: () => this.count.value++ }));
  }

}
