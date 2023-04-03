#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import { program } from "commander";
import { Actions } from "./actions.js";

// Display Lynx CLI app name
const appName = "Lynx";
const appLabel = figlet.textSync(appName, { font: 'Ogre', horizontalLayout: 'fitted' });
console.log(chalk.yellow(appLabel));

// Init objects
const actions = new Actions();

// Display version information
program
  .name("Lynx")
  .version("Version: 0.0.1\nCodename: Genesis\nAuthor: Ralph Marvin Addo")
  .description("Quickly and easily create Fovea project files and directories")

program
  .command("create-module <module-name>")
  .description("Creates all modules files and directories.")
  .action(async (moduleName: string, options: any) => await actions.createModuleAction(moduleName, options));

program
  .command("create ui-module <module-name>")
  .description("Create all the files needed for the frontend part of the app.")
  .action(async (moduleName: string, options: any) => console.log("ui module"));

program
  .command("reset")
  .description("Resets fovea app data. This command re-runs migrations, seeders etc.")
  .action(async () => await actions.resetProjectAction());

program
  .command("re-int")
  .description("Checkouts the develop branch and runs artisan commands.")
  .action(async () => await actions.reinitializeProjectAction());

program
  .command("setup")
  .description("Setup a new Fovea project, from cloning to installing composer to running artisan commands.")
  .action(async () => await actions.setupNewProjectAction());

program.parse();
