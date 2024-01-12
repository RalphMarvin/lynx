import File from "fs-extra";

export class Common {
  /**
   * Checks and verifies that the current working directory is a laravel project.
   * @returns
   */
  static verifyIsLaravelProject(): boolean {
    // Basically checking to see if an artisan file is present. This isn't the best
    // way but this will do for now as a much faster solution.
    const laravelProjectRoot = process.cwd();
    const artisanFile = `${laravelProjectRoot}/artisan`;
    return File.existsSync(artisanFile);
  }
}
