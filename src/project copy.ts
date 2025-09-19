import prompts from "prompts";
import { Validate } from "./validate";
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import { spawn } from "node:child_process";
import ora from 'ora';
import chalk from "chalk";



interface IOptions {
    laguage: 'js' | 'ts';
    router?: boolean;
    mobile?: boolean;
    mobileType?: 'capacitor' | 'typecomposer-native';
    tailwindcss?: boolean;
}

export namespace Project {

    async function getInput(message: string, validate: (value: string) => boolean | string, defaultValue?: string) {
        const { response } = await prompts({
            type: "text",
            name: 'response',
            message: message,
            validate: validate,
            initial: defaultValue
        });
        return response;
    }

    async function getSelect(message: string, choices: prompts.Choice[], initial?: number) {
        const { response } = await prompts({
            type: 'select',
            name: 'response',
            message: message,
            choices: choices,
            initial: initial,
        });
        return response;
    }

    async function getConfirm(message: string, initial: boolean = true) {
        const { response } = await prompts({
            type: 'confirm',
            name: 'response',
            message: message,
            initial: initial,
        });
        return response;
    }

    function getTemplateDir(template: string): string {
        return path.resolve(
            fileURLToPath(import.meta.url),
            '../..',
            `templates/${template}`,
        )
    }

    async function createProjectDir(projectPath: string) {
        if (fs.existsSync(projectPath)) {
            fs.rmSync(projectPath, { recursive: true });
        }
        fs.mkdirSync(projectPath, { recursive: true });
    }


    async function getPackageJson(templateDir: string, packageName: string) {
        const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),)
        pkg.name = packageName;
        return JSON.stringify(pkg, null, 2) + '\n';
    }

    async function copyTemplateFiles(templateDir: string, projectPath: string, packageName: string) {
        const files = fs.readdirSync(templateDir);
        for (const file of files) {
            const targetPath = path.resolve(projectPath, file);
            const sourcePath = path.resolve(templateDir, file);
            const stat = fs.statSync(sourcePath);
            if (stat.isDirectory()) {
                fs.mkdirSync(targetPath);
                copyTemplateFiles(sourcePath, targetPath, packageName);
            } else {
                let content = fs.readFileSync(sourcePath, 'utf-8');
                content = content.replace(/\$\{packageName\}/g, packageName);
                if (path.basename(file) === 'package.json') {
                    content = await getPackageJson(templateDir, packageName);
                }
                fs.writeFileSync(targetPath, content, {
                    encoding: 'utf-8',
                    flag: 'w'
                });
            }
        }
    }

    async function executeCommand(command: string, args: string[], options: any) {
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

    export async function create(template: string, type: 'js' | 'ts' | "ts-tailwindcss") {
        const projectName = await getInput('Project name:', Validate.projectName, 'typecomposer-project');
        const packageName = await getInput('Package name:', Validate.packageName, projectName);
        const routerOption = await getConfirm('router:', false);
        template = `${template}-${type}${(routerOption ? '-router' : '')}`;
        const mobileOption = await getConfirm('mobile:', false);
        let mobileType = '';
        if (mobileOption) {
            const isCapacitor = process.versions.node >= '20';
            mobileType = await getSelect('mobile type:', [
                //{ title: 'typecomposer-native', value: 'typecomposer-native' },
                {
                    title: isCapacitor ? 'capacitor' : 'capacitor (node version >= 20 required)', value: 'capacitor', disabled: !isCapacitor
                },
                { title: 'back', value: 'back' }
            ]);
        }
        const templateDir = getTemplateDir(template);
        const root = path.resolve(projectName);
        let isCreate = true;
        if (fs.existsSync(root))
            isCreate = await getConfirm(`Directory ${projectName} already exists. Do you want to overwrite it?`, false);
        if (isCreate === false) {
            console.log('Aborted');
            return;
        }
        let spinner = ora('installing dependencies...');
        try {
            await createProjectDir(root);
            await copyTemplateFiles(templateDir, root, packageName);
            spinner.start();
            if (mobileOption && mobileType === 'capacitor') {
                await copyTemplateFiles(getTemplateDir("project-capacitor"), root, packageName);
                await executeCommand('npm', ['install'], { cwd: root });
                spinner.stop();
                spinner = ora('adding capacitor...');
                spinner.start();
                await executeCommand('npx', ['cap', 'add', 'ios'], { cwd: root });
                await executeCommand('npx', ['cap', 'add', 'android'], { cwd: root });
                await executeCommand('npm', ['run', 'build'], { cwd: root });
                await executeCommand('npx', ['cap', 'sync'], { cwd: root });
                spinner.stop();
            }
            else
                await executeCommand('npm', ['install'], { cwd: root });
            console.log(`\n${chalk.green('✔')} Project created successfully`);
            console.log("cd", projectName);
            console.log('npm start');
            spinner?.stop();
            return;
        }
        catch (e) {
            spinner?.stop();
        }
        console.log('Aborted');
    }
}