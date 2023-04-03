export class Common {
  /**
   * Checks and verifies that the current working directory is a fovea project.
   */
  static verifyFoveaProject(): boolean {
    const foveaProjectRoot = process.cwd();
    const index = foveaProjectRoot.lastIndexOf('/');
    const projectName = foveaProjectRoot.substring(index);
    return projectName.toLowerCase() === 'fovea';
  }
}
