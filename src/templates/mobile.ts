import ora from "ora";
import { IOptions, copyTemplateFiles, executeCommand } from "../utils";


export namespace Mobile {
	export async function create(options: IOptions) {
		const template = options.template.replace(`-${options.laguage}`, "");
		await copyTemplateFiles((`${template}-${options.mobileType}`), options.root, options.packageName, options, true);
	}

	export async function execute(options: IOptions) {
		if (options.mobileType === 'capacitor') {
			const root = options.root;
			const spinner = ora('adding capacitor...');
			spinner.start();
			try {
				await executeCommand('npx', ['cap', 'add', 'ios'], { cwd: root });
				await executeCommand('npx', ['cap', 'add', 'android'], { cwd: root });
				await executeCommand('npm', ['run', 'build'], { cwd: root });
				await executeCommand('npx', ['cap', 'sync'], { cwd: root });
				spinner.stop();
			} catch (e) {
				spinner.stop();
				console.error(e);
			}
		}
	}
}