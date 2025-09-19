import { ButtonElement, Component, H1Element, HBox, ImageElement, ref, VBox } from "typecomposer";

export class AppPage extends Component {

	count = ref(0);

	constructor() {
		super({ style: { width: "100dvw", height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" } });
		const vbox = this.appendChild(new VBox({ style: { justifyContent: "center", height: "100dvh", maxWidth: "300px" } }));
		const images = new HBox({ style: { alignItems: "center", justifyContent: "center" } });
		images.append(new ImageElement({ src: "typescript.svg", className: "logo" }));
		images.append(new ImageElement({ src: "typecomposer.svg", className: "logo" }));
		vbox.append(new H1Element({ text: "TypeComposer", style: { textAlign: "center", color: "#fcfffa" } }));
		vbox.append(images);
		vbox.append(new ButtonElement({ text: this.count, onclick: () => this.count.value++ }));
	}

}
