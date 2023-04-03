import chalk from "chalk";

export class Console {
  static logProgress(message: string): void {
    const formattedMessage = chalk.yellow(message);
    console.log(formattedMessage);
  }

  static logSuccess(message: string): void {
    const formattedMessage = chalk.greenBright(message);
    console.log(formattedMessage);
  }
  static logWarning(message: string): void {
    const formattedMessage = chalk.bgBlack.yellowBright(message);
    console.log(formattedMessage);
  }

  static logFailure(message: string): void {
    const formattedMessage = chalk.redBright(message);
    console.log(formattedMessage);
  }

  static screenSeparator(lineNumber: number):void {
    for (let i = 0; i < lineNumber; i++) {
      console.log(" ");
    }
  }
}
