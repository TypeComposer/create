import { copyTemplateFiles, IOptions } from "../utils";
import fs from 'node:fs'

export namespace Router {

	export async function create(options: IOptions) {
		await copyTemplateFiles((`${options.template}-router`), options.root, options.packageName, options, true);
		const fileMain = `${options.root}/src/main.${options.laguage}`;
		let content = fs.readFileSync(fileMain, 'utf-8');
		content = content.replace(`import { App } from "typecomposer";`, "");
		content = content.replace(`import { AppPage } from "./AppPage";`, "");
		content = content.replace("App, ", "");
		content = content.replace("App.setPage(new AppPage());", "");
		fs.writeFileSync(fileMain, content.trim(), {
			encoding: 'utf-8',
			flag: 'w'
		});
	}
}