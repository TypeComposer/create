import typescriptLogo from '/typescript.svg'
import logo from '/typecomposer.svg'
import { App, BorderPanel, ButtonElement, H1Element, HBox, ImageElement, VBox } from 'typecomposer'
import './style.css'

export class TestComponent extends BorderPanel {

  private count: number = 0;

  constructor() {
    super();
    const vbox = new VBox({ style: { justifyContent: "center" } });
    const images = new HBox({ style: { width: "100%", alignItems: "center", justifyContent: "center" } });
    images.append(new ImageElement({ src: logo, className: "logo" }));
    images.append(new ImageElement({ src: typescriptLogo, className: "logo" }));
    vbox.append(images);
    vbox.append(new H1Element({ text: "TypeComposer", style: { textAlign: "center", color: "#fcfffa" } }));
    const counter = new ButtonElement({ text: "0", style: { width: "35%", height: "50px", alignSelf: "center" } });
    counter.onclick = () => counter.innerHTML = (this.count++).toString();
    vbox.append(counter);
    this.center = vbox;
  }

}

// App.setPage(new TestComponent());