import { Console } from "./console.js";
import { Artisan } from "./artisan.js";

export class Project {
  private readonly artisanCommander: Artisan;

  constructor() {
    this.artisanCommander = new Artisan();
  }

  private async gitCheckoutBranch(branch: string) {
    try {
      await this.artisanCommander.executeCommand("git checkout", `${branch}`);
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async gitCloneBranch(branch: string) {
    try {
      Console.logProgress("Cloning develop branch ...");
      await this.artisanCommander.executeCommand("git clone ", `-b ${branch}`);
      Console.logSuccess("Cloning completed successfully.");
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async changeDirectoryIntoProject() {
    try {
      Console.logProgress("Changing directory into project directory ...");
      const workingDirectory = process.cwd();
      process.chdir(`${workingDirectory}/fovea`);
      Console.logSuccess("Directory change completed successfully.");
    } catch (error) {
      Console.logFailure(`chdir command error: ${error}`)
    }
  }

  private async runComposerInstall() {
    try {
      Console.logProgress("Running `composer install` ...");
      await this.artisanCommander.executeCommand("composer install");
      Console.logSuccess("Composer install completed successfully.");
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async runNpmInstall() {
    try {
      Console.logProgress("Running `npm install` ...");
      await this.artisanCommander.executeCommand("npm install");
      Console.logSuccess("Npm install completed successfully.");
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async resetMigration() {
    try {
      await this.artisanCommander.executeArtisanCommands("migrate:reset");
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async installPassportWithUuids() {
    try {
      await this.artisanCommander.executeArtisanCommands("passport:install --uuids");
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async runMigrations() {
    try {
      await this.artisanCommander.executeArtisanCommands("migrate");
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async runSeeder() {
    try {
      Console.logProgress("Seeding data ...");
      await this.artisanCommander.executeArtisanCommands("db:seed");
      Console.logSuccess("Seeding completed successfully.");
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async cacheConfigurations() {
    try {
      await this.artisanCommander.executeArtisanCommands("config:cache");
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async runOptimizer() {
    try {
      await this.artisanCommander.executeArtisanCommands("optimize");
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  async resetProject() {
    try {
      await this.resetMigration();
      await this.installPassportWithUuids();
      await this.runMigrations();
      await this.runSeeder();
      await this.cacheConfigurations();
      await this.runOptimizer();
    } catch (error) {
      Console.logFailure("Reset completed with errors.");
    }
  }

  async reInitializeProject() {
    try {
      await this.gitCheckoutBranch("develop");
      await this.runComposerInstall();
      await this.resetMigration();
      await this.installPassportWithUuids();
      await this.runMigrations();
      await this.runSeeder();
      await this.cacheConfigurations();
      await this.runOptimizer();
      await this.runNpmInstall();
    } catch (error) {
      Console.logFailure("Reset completed with errors.");
    }
  }

  async setupProject() {
    try {
      await this.gitCloneBranch("develop");
      await this.changeDirectoryIntoProject(); // TODO: Needs work - provision of project name or path
      await this.runComposerInstall();
      await this.resetMigration();
      await this.installPassportWithUuids();
      await this.runMigrations();
      await this.runSeeder();
      await this.cacheConfigurations();
      await this.runOptimizer();
      await this.runNpmInstall();
    } catch (error) {
      Console.logFailure("Setup completed with errors.");
    }
  }
}
