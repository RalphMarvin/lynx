export class FileContent {
  getServiceInterfaceContents(name: string): string {
    return `<?php \n
    namespace App\\Modules\\${name}\\Contracts;\n
    interface ${name}ServiceInterface
    {} \n
    ?>`;
  }

  getRepositoryInterfaceContents(name: string): string {
    return `<?php \n
    namespace App\\Modules\\${name}\\Contracts; \n
    interface ${name}RepositoryInterface
    {} \n
    ?>`;
  }

  getRepositoryContents(name: string): string {
    return `<?php \n
    namespace App\\Modules\\${name}\\Repositories; \n
    use App\\Modules\\Base\\Repositories\\BaseRepository;
    use App\\Modules\\${name}\\Contracts\\${name}RepositoryInterface; \n
    class ${name}Repository extends BaseRepository implements ${name}RepositoryInterface
    {} \n
    ?>`;
  }

  getServiceContents(name: string): string {
    return `<?php \n
    namespace App\\Modules\\${name}\\Services; \n
    use App\\Modules\\${name}\\Contracts\\${name}ServiceInterface; \n
    class ${name}Service implements ${name}ServiceInterface
    {} \n
    ?>`;
  }
}
