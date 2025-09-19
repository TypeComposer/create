

export namespace Validate {

    export function projectName(value: string): string | boolean {
        value = value.trim()
        const regex = /^[a-zA-Z][a-zA-Z0-9-_]+$/;

        if (value === '' || !regex.test(value))
            return 'Please enter a valid project name.';
        return true
    }

    export function packageName(value: string): string | boolean {
        value = value.trim();
        const regex = /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/;
        if (value === '' || !regex.test(value))
            return 'Invalid package.json name';
        return true;
    }
}