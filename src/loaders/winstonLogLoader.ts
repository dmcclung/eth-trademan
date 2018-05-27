import { MicroframeworkSettings } from "microframework";
import { Logger } from "winston";

export function winstonLogLoader(options?: MicroframeworkSettings) {
    if (options) {
        // TODO: Improve this so it's logging out to a file for prod
        const logger = new Logger();
        options.setData("logger", logger);
    }
}
