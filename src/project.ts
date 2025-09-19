import prompts from "prompts";
import { Validate } from "./validate";
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import { copyTemplateFiles, executeCommand, IOptions } from "./utils";
import { Router } from "./templates/router";
import { Tailwindcss } from "./templates/tailwindcss";
import { Mobile } from "./templates/mobile";
import ora from "ora";
import chalk from "chalk";


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

    async function createProjectDir(options: IOptions) {
        if (fs.existsSync(options.root)) {
            fs.rmSync(options.root, { recursive: true });
        }
        fs.mkdirSync(options.root, { recursive: true });
        await copyTemplateFiles(`${options.template}-base`, options.root, options.packageName, options);
    }



    async function installDependencies(options: IOptions) {
        const spinner = ora('Installing dependencies...');
        spinner.start();
        try {
            await executeCommand('npm', ['install'], { cwd: options.root });
            spinner.stop();
        } catch (e) {
            spinner.stop();
            console.error(e);
        }
    }

    async function createProject(options: IOptions) {
        try {
            let isCreate = true;
            if (fs.existsSync(options.root))
                isCreate = await getConfirm(`Directory ${options.projectName} already exists. Do you want to overwrite it?`, false);
            if (isCreate === false) {
                console.log('Aborted');
                return;
            }
            await createProjectDir(options);
            if (options.tailwindcss)
                await Tailwindcss.create(options);
            if (options.mobile)
                await Mobile.create(options);
            if (options.router)
                await Router.create(options);
            await installDependencies(options);
            if (options.mobile)
                await Mobile.execute(options);
            console.log(chalk.green('✔'), 'Project created successfully');
            console.log(chalk.green('✔'), 'Run the following commands to start the project:\n');
            console.log("🔹", "cd", options.projectName);
            console.log("🔹", "npm start");
        }
        catch (e) {
            console.log('Aborted');
        }

    }

    async function getMobileOptions(): Promise<{ mobile: boolean, mobileType?: 'capacitor' | 'typecomposer-native' }> {
        // const mobileOption = await getConfirm('mobile:', false);
        // if (mobileOption) {
        //     const isCapacitor = process.versions.node >= '20';
        //     const mobileType = await getSelect('mobile type:', [
        //         //{ title: 'typecomposer-native', value: 'typecomposer-native' },
        //         {
        //             title: isCapacitor ? 'capacitor' : 'capacitor (node version >= 20 required)', value: 'capacitor', disabled: !isCapacitor
        //         },
        //         { title: 'back', value: 'back' }
        //     ]);
        //     if (mobileType === 'back') {
        //         return getMobileOptions();
        //     }
        //     return { mobile: mobileOption, mobileType: mobileType };
        // }
        // return { mobile: mobileOption, mobileType: undefined };
        return { mobile: false, mobileType: undefined }; // Temporarily disable mobile options
    }

    export async function create(template: string, type: 'js' | 'ts') {
        const projectName = await getInput('Project name:', Validate.projectName, 'typecomposer-project');
        const packageName = await getInput('Package name:', Validate.packageName, projectName);
        const routerOption = await getConfirm('router:', false);
        const tailwindcssOption = await getConfirm('tailwindcss:', false);
        const { mobile, mobileType } = await getMobileOptions();
        const options: IOptions = {
            laguage: type,
            projectName: projectName,
            packageName: packageName,
            router: routerOption,
            mobile: mobile,
            mobileType: mobileType as 'capacitor' | 'typecomposer-native',
            tailwindcss: tailwindcssOption,
            root: path.resolve(projectName),
            template: getTemplateDir(`${template}-${type}`),
        }
        await createProject(options);
    }
}