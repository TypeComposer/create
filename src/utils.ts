
import { spawn } from 'node:child_process';
import fs from 'node:fs'
import path from 'node:path'

export interface IOptions {
	laguage: 'js' | 'ts';
	projectName: string;
	packageName: string;
	router?: boolean;
	mobile?: boolean;
	mobileType?: 'capacitor' | 'typecomposer-native';
	tailwindcss?: boolean;
	root: string;
	template: string;
}

export async function getPackageJson(templateDir: string, packageName: string, targetPath: string, options: IOptions, overwrite: boolean): Promise<string> {
	const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'))
	if (overwrite) {
		const base = JSON.parse(fs.readFileSync(targetPath, 'utf-8'))
		const newPkg: { [key: string]: any } = base;
		for (const key in pkg) {
			if (typeof newPkg[key] === 'object') {
				newPkg[key] = { ...pkg[key], ...base[key] };
			} else
				newPkg[key] = pkg[key];
		}
		return JSON.stringify(newPkg, null, 2) + '\n';
	}
	pkg.name = packageName;
	return JSON.stringify(pkg, null, 2) + '\n';
}

export async function copyTemplateFiles(templateDir: string, projectPath: string, packageName: string, options: IOptions, overwrite: boolean = false) {
	const files = fs.readdirSync(templateDir);
	for (const file of files) {
		const targetPath = path.resolve(projectPath, file);
		const sourcePath = path.resolve(templateDir, file);
		const stat = fs.statSync(sourcePath);
		if (stat.isDirectory()) {
			if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath);
			copyTemplateFiles(sourcePath, targetPath, packageName, options, overwrite);
		} else if (!path.basename(file).startsWith(".") || path.basename(file) === ".gitignore") {
			let content = fs.readFileSync(sourcePath, 'utf-8');
			content = content.replace(/\$\{packageName\}/g, packageName);
			if (path.basename(file) === 'package.json') {
				content = await getPackageJson(templateDir, packageName, targetPath, options, overwrite);
			}
			fs.writeFileSync(targetPath, content, {
				encoding: 'utf-8',
				flag: 'w'
			});
		}
	}
}

export async function executeCommand(command: string, args: string[], options: any) {
	return new Promise<void>((resolve, reject) => {
		try {
			const child = spawn(command, args, options);
			child.on('close', (code) => {
				if (code === 0) {
					resolve();
				} else {
					reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
				}
			});
			//child.stdout.on('data', (data) => {
			//    console.log(data.toString());
			//});

			child.stderr.on('data', (data) => {
				const str = data.toString();
				if (!str.includes('bg1.jpg referenced')) {
					console.log(str);
				}
			});
		} catch (e) {
			console.error(e);
			reject(e);
		}
	}
	);
}