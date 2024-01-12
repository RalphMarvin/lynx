import File from "fs-extra";
import { cwd } from "process";
import { Artisan } from "./artisan.js";
import { Console } from "./console.js";
import { FileContent } from "./file-content.js";

export class FileManager {
  /**
   * Name of the module
   * @private
   */
  private readonly name: string;

  /**
   * Contents of file.
   * @private
   */
  private readonly fileContent: FileContent;

  /**
   * Helper that executes artisan commands.
   * @private
   */
  private readonly artisanCommander: Artisan;

  /**
   * File Manager: Responsible for creating and writing to file.
   * @param name
   */
  constructor(name: string) {
    this.name = name;
    this.fileContent = new FileContent();
    this.artisanCommander = new Artisan();
  }

  /**
   * Creates a directory in a specified path recursively.
   * @param path
   * @private
   */
  private async createDirectory(path: string) {
    await File.mkdir(path, { recursive: true });
  }

  /**
   * Creates and writes to a file. Assumes the file exists.
   * @param path
   * @param data
   * @private
   */
  private async createFile(path: File.PathOrFileDescriptor, data: (string | NodeJS.ArrayBufferView)) {
    await File.writeFile(path, data);
  }

  private async createServiceInterface(name: string, fileName: string) {
    Console.logProgress(`Creating ${name}ServiceInterface.php ...`);
    const content = this.fileContent.getServiceInterfaceContents(name);
    await this.createFile(fileName, content);
    Console.logSuccess(`✓ File Created`);
  }

  private async createRepositoryInterface(name: string, fileName: string) {
    Console.logProgress(`Creating ${name}RepositoryInterface.php ...`);
    const content = this.fileContent.getRepositoryInterfaceContents(name);
    await this.createFile(fileName, content);
    Console.logSuccess(`✓ File Created`);
  }

  private async createRepository(name: string, fileName: string) {
    Console.logProgress(`Creating ${name}Repository.php ...`);
    const content = this.fileContent.getRepositoryContents(name);
    await this.createFile(fileName, content);
    Console.logSuccess(`✓ File Created`);
  }

  private async createService(name: string, fileName: string) {
    Console.logProgress(`Creating ${name}Service.php ...`);
    const content = this.fileContent.getServiceContents(name);
    await this.createFile(fileName, content);
    Console.logSuccess(`✓ File Created`);
  }

  private async createModel(name: string) {
    console.log(`Current directory: ${cwd()}`);
    try {
      await this.artisanCommander.executeArtisanCommands("make:model", `${name} -m`);
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async createController(name: string) {
    try {
      await this.artisanCommander.executeArtisanCommands("make:controller", `${name}Controller --api`);
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async createStoreRequest(name: string) {
    try {
      await this.artisanCommander.executeArtisanCommands("make:request", `Create${name}Request`);
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async createUpdateRequest(name: string) {
    try {
      await this.artisanCommander.executeArtisanCommands("make:request", `Update${name}Request`);
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async createResource(name: string) {
    try {
      await this.artisanCommander.executeArtisanCommands("make:resource", `${name}Resource`);
      await this.artisanCommander.executeArtisanCommands("make:resource", `List${name}Resource`);
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async createMiddleware(name: string) {
    try {
      await this.artisanCommander.executeArtisanCommands("make:middleware", `${name}Middleware`);
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  private async createPolicy(name: string) {
    try {
      await this.artisanCommander.executeArtisanCommands("make:policy", `${name}Policy`);
    } catch (error) {
      Console.logFailure(`Artisan error: ${error}`);
    }
  }

  async createModule() {
    const name = this.name;

    // create the main directory (module)
    await this.createDirectory(`app/Modules/${name}`);

    // create the subdirectories
    await this.createDirectory(`app/Modules/${name}/Services`);
    await this.createDirectory(`app/Modules/${name}/Contracts`);
    await this.createDirectory(`app/Modules/${name}/Repositories`);

    // create the ServiceInterface.php file
    await this.createServiceInterface(name, `app/Modules/${name}/Contracts/${name}ServiceInterface.php`);

    // create the RepositoryInterface.php file
    await this.createRepositoryInterface(name, `app/Modules/${name}/Contracts/${name}RepositoryInterface.php`);

    // create the Repository.php file
    await this.createRepository(name, `app/Modules/${name}/Repositories/${name}Repository.php`);

    // create the Service.php file
    await this.createService(name, `app/Modules/${name}/Services/${name}Service.php`);

    // create the Model.php file
    await this.createModel(name);

    // create the app/Http/Controllers directory if it doesn't already exist
    if (!(await File.exists("app/Http/Controllers"))) {
      await File.mkdir("app/Http/Controllers", { recursive: true });
    }

    // create the Controller.php file
    await this.createController(name);

    // create the app/Http/Requests directory if it doesn't already exist
    if (!(await File.exists("app/Http/Requests"))) {
      await File.mkdir("app/Http/Requests", { recursive: true });
    }

    // create the Request.php files (Store & Update)
    await this.createStoreRequest(name);
    await this.createUpdateRequest(name);

    // create the app/Http/Resources directory if it doesn't already exist
    if (!(await File.exists("app/Http/Resources"))) {
      await File.mkdir("app/Http/Resources", { recursive: true });
    }

    // create the Resource.php file
    await this.createResource(name);

    // create the app/Http/Middleware directory if it doesn't already exist
    if (!(await File.exists("app/Http/Middleware"))) {
      await File.mkdir("app/Http/Middleware", { recursive: true });
    }

    // create the Middleware.php file
    await this.createMiddleware(name);

    // create the app/Policies directory if it doesn't already exist
    if (!(await File.exists("app/Policies"))) {
      await File.mkdir("app/Policies", { recursive: true });
    }

    // create the Policy.php file
    await this.createPolicy(name);
  }
}
