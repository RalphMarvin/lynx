import { exec } from "child_process";
import { Console } from "./console.js";

export class Artisan {
  private async executeArtisanCommand(artisanCommand: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(`docker-compose exec -T app php artisan ${artisanCommand}`, (error, stdout, stderr) => {
        if (error) {
          reject(error.message);
          return;
        }
        if (stderr) {
          reject(stderr);
          return;
        }
        Console.logSuccess(`Artisan response: ${stdout}`);
        resolve();
      });
    });
  }

  private async executeArtisanCommandWithArgs(artisanCommand: string, argument: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(`docker-compose exec -T app php artisan ${artisanCommand} ${argument}`, (error, stdout, stderr) => {
        if (error) {
          reject(error.message);
          return;
        }
        if (stderr) {
          reject(stderr);
          return;
        }
        Console.logSuccess(`Artisan response: ${stdout}`);
        resolve();
      });
    });
  }

  async executeArtisanCommands(artisanCommand: string, argument?: string): Promise<void> {
    if (argument !== undefined) {
      Console.logProgress(`Running artisan command: ${artisanCommand} ${argument} ...`);
      return await this.executeArtisanCommandWithArgs(artisanCommand, argument);
    } else {
      Console.logProgress(`Running artisan command: ${artisanCommand} ...`);
      return await this.executeArtisanCommand(artisanCommand);
    }
  }

  async executeCommand(command: string, argument?: string): Promise<void> {
    let commandAndArgs = "";
    commandAndArgs = argument !== undefined ? `${command} ${argument}` : `${command}`;
    return new Promise((resolve, reject) => {
      exec(`${commandAndArgs}`, (error, stdout, stderr) => {
        if (error) {
          reject(error.message);
          return;
        }
        if (stderr) {
          reject(stderr);
          return;
        }
        Console.logSuccess(`Artisan response: ${stdout}`);
        resolve();
      });
    });
  }
}
