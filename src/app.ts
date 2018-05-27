import { bootstrapMicroframework } from "microframework";
import bootstrapLoaders from "./loaders";

bootstrapMicroframework(
    bootstrapLoaders,
).then(() => console.log("Application is running"))

 .catch((error) => console.log("Application error: " + error));

// TODO: Need a banner here and more details on what was loaded
