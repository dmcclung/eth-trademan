import { bootstrapMicroframework } from "microframework";
import bootstrapLoaders from "./loaders";

bootstrapMicroframework(
    bootstrapLoaders
).then(() => console.log("Application is running"))

 .catch((error) => console.log("Application error: " + error));
