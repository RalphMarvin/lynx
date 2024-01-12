import { exec } from "child_process";
import { Console } from "./console.js";

export class Artisan {
  /**
   * Executes artisan command.
   * @param artisanCommand 
   * @returns 
   */
  private async executeArtisanCommand(artisanCommand: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(`php artisan ${artisanCommand}`, (error, stdout, stderr) => {
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

  /**
   * Executes artisan command with an argument.
   * @param artisanCommand 
   * @param argument 
   * @returns 
   */
  private async executeArtisanCommandWithArgs(artisanCommand: string, argument: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(`php artisan ${artisanCommand} ${argument}`, (error, stdout, stderr) => {
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

  /**
   * Runs an artisan command.
   * @param artisanCommand 
   * @param argument 
   * @returns 
   */
  async executeArtisanCommands(artisanCommand: string, argument?: string): Promise<void> {
    if (argument !== undefined) {
      Console.logProgress(`Running artisan command: ${artisanCommand} ${argument} ...`);
      return await this.executeArtisanCommandWithArgs(artisanCommand, argument);
    } else {
      Console.logProgress(`Running artisan command: ${artisanCommand} ...`);
      return await this.executeArtisanCommand(artisanCommand);
    }
  }

  /**
   * Executes a shell command.
   * @param command 
   * @param argument 
   * @returns 
   */
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
