

export type MenuType = MenuItem | Menu;
export type MenuPreview = MenuType;

export namespace Color {
    export const RESET = "\x1b[0m";
    export const RED = "\x1b[31m";
    export const GREEN = "\x1b[32m";
    export const YELLOW = "\x1b[33m";
    export const BLUE = "\x1b[34m";
    export const MAGENTA = "\x1b[35m";
    export const CYAN = "\x1b[36m";
    export const WHITE = "\x1b[37m";
    export const BG_RED = "\x1b[41m";
}

function formatText(text: string, color: string): string {

    return `${color}${text}${Color.RESET}`
}


export class Menu {

    public text: string;

    constructor(public message: string, public color: string, public variants: MenuType[], public type: 'select' | 'text' = 'select') {
        this.text = message;
        this.message = formatText(message, color)
    }

}

export class MenuItem {

    public static readonly Action = async () => { }
    public text: string;

    constructor(public message: string, public color: string, public action: (item: MenuItem, preview: MenuPreview) => Promise<void>, public type: 'select' | 'text' = 'select') {
        this.text = message;
        this.message = formatText(message, color)
    }

}