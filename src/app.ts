import { bootstrapMicroframework } from "microframework";
import { Logger } from "winston";
import bootstrapLoaders from "./loaders";

const logger = new Logger();

bootstrapMicroframework(
    bootstrapLoaders,
).then(() => logger.info("Application is running"))

 .catch((error) => logger.error("Application error: " + error));
