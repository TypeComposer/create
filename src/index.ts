#!/usr/bin/env node
import prompts from "prompts";
import { Color, Menu, MenuItem, MenuPreview } from "./menu";
import { Project } from "./project";

const MENU: Menu = new Menu("TypeComposer Template:", Color.BLUE, [
  new Menu("Project", Color.BLUE, [
    new MenuItem(
      "TypeScript",
      Color.BLUE,
      () => Project.create("project", "ts"),
      "select"
    ),
    //new MenuItem('TypeScript + Tailwindcss', Color.GREEN, () => Project.create('project', 'ts-tailwindcss'), 'select'),
    // new MenuItem('JavaScript', Color.YELLOW, () => Project.create('project', 'js'), 'select')
  ]),
  new Menu("Library", Color.MAGENTA, [
    new MenuItem(
      "TypeScript",
      Color.BLUE,
      () => Project.create("library", "ts"),
      "select"
    ),
    // new MenuItem('JavaScript', Color.YELLOW, () => Project.create('library', 'js'), 'select')
  ]),
]);

async function executePrompt(
  menu: Menu,
  preview: MenuPreview | undefined = undefined
) {
  console.clear();
  if (
    preview &&
    menu.variants.find((item) => item.text === "back") === undefined
  ) {
    menu.variants.push(
      new MenuItem("back", Color.RED, async () => {
        await executePrompt(preview as Menu);
      })
    );
  }
  const { response } = await prompts({
    type: menu.type,
    name: "response",
    message: menu.message,
    choices: menu.variants.map((item) => ({
      title: item.message,
      value: item,
    })),
  });

  if (response === undefined) return;

  if (response instanceof Menu) await executePrompt(response, menu);
  else if (response instanceof MenuItem) await response.action(response, menu);
}

function setupShutdownHandlers() {
  const onExit = (signal?: string) => {
    try {
      console.log();
      console.log(
        "Process interrupted" + (signal ? ` (${signal})` : "") + ". Exiting..."
      );
    } catch (e) {
      // ignore
    }
    // ensure a clean exit
    process.exit(0);
  };

  process.on("SIGINT", () => onExit("SIGINT"));
  process.on("SIGTERM", () => onExit("SIGTERM"));

  // Handle Ctrl+D (stdin EOF) for interactive terminals
  if (process.stdin && typeof process.stdin.on === "function") {
    process.stdin.on("end", () => onExit("EOF"));
    // enable flowing mode so 'end' fires when stream ends
    try {
      process.stdin.resume();
    } catch (e) {
      /* ignore */
    }
  }
}

async function init() {
  setupShutdownHandlers();
  await executePrompt(MENU);
}

init().catch((e) => {
  // If prompts were cancelled, they resolve to undefined; surface a friendly message
  if (
    e &&
    (e.message === "PROMPT_CANCELLED" || e.code === "PROMPT_CANCELLED")
  ) {
    console.log("Cancelled. Exiting...");
    process.exit(0);
  }
  console.error(e);
  process.exit(1);
});
