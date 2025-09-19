import { copyTemplateFiles, IOptions } from "../utils";
import fs from 'node:fs'

export namespace Tailwindcss {
	export async function create(options: IOptions) {
		await copyTemplateFiles((`${options.template}-tailwindcss`), options.root, options.packageName, options, true);
		const fileCss = `${options.root}/src/style.css`;
		let content = fs.readFileSync(fileCss, 'utf-8');
		content = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n` + content;
		fs.writeFileSync(fileCss, content, {
			encoding: 'utf-8',
			flag: 'w'
		});
	}
}