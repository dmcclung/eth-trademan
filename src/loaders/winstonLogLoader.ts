import { MicroframeworkSettings } from "microframework";
import { Logger } from "winston";

export function winstonLogLoader(options?: MicroframeworkSettings) {
    if (options) {
        const logger = new Logger();
        options.setData("logger", logger);
    }
}
