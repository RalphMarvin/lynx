import { Common } from "./common.js";
import { Console } from "./console.js";
import { Project } from "./project.js";
import { FileManager } from "./file-manager.js";

export class Actions {
  private handleNonFoveaProject() {
    const isFoveaProject = Common.verifyFoveaProject();
    if (!isFoveaProject) {
      Console.screenSeparator(1);
      Console.logWarning(`WARNING: Working directory is not a Fovea Project`);
      Console.logFailure(`Lynx is exiting with code 1`);
      return;
    }
  }

  private handleIsFoveaProject() {
    const isFoveaProject = Common.verifyFoveaProject();
    if (isFoveaProject) {
      Console.screenSeparator(1);
      Console.logWarning(`WARNING: The current working directory is a fovea project. You cannot setup a new project in the current working directory`);
      Console.logFailure(`Lynx is exiting with code 1 `);
      return;
    }
  }

  async createModuleAction(moduleName: string, options: any) {
    this.handleNonFoveaProject();
    const fileManager = new FileManager(moduleName);

    Console.screenSeparator(1);
    Console.logProgress(`Creating module: ${moduleName} ...`);
    Console.screenSeparator(1);

    await fileManager.createModule();
    Console.logSuccess(`Creation of module: ${moduleName} has been completed.`);
    Console.logWarning("NOTE: Don't forget to add repositories bindings to the ff files:\n/Providers/AppServiceProvider.php\n/Providers/RepositoryServiceProvider.php");
  }

  async resetProjectAction() {
    this.handleNonFoveaProject();
    const projectManager = new Project();

    Console.screenSeparator(1);
    Console.logProgress("Running a reset ...");
    Console.screenSeparator(1);

    await projectManager.resetProject();
    Console.logSuccess("Reset completed successfully.");
  }

  async reinitializeProjectAction() {
    this.handleIsFoveaProject();
    const projectManager = new Project();

    Console.screenSeparator(1);
    Console.logProgress("Re-initializing project ...");
    Console.screenSeparator(1);

    await projectManager.reInitializeProject();
  }

  async setupNewProjectAction() {
    this.handleIsFoveaProject();
    const projectManager = new Project();

    Console.screenSeparator(1);
    Console.logProgress("Setting up a new fovea project. This might take a while ...");
    Console.screenSeparator(1);

    await projectManager.setupProject();
  }
}
