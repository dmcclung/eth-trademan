import { MicroframeworkLoader } from "microframework";
import { emitterLoader } from "./emitterLoader";
import { gdaxFeedLoader } from "./gdaxFeedLoader";
import { gdaxOrderLoader } from "./gdaxOrderLoader";
import { priceServiceLoader } from "./priceServiceLoader";
import { winstonLogLoader } from "./winstonLogLoader";

const bootstrapLoaders: MicroframeworkLoader[] = [
    winstonLogLoader,
    emitterLoader,
    gdaxFeedLoader,
    gdaxOrderLoader,
    priceServiceLoader,
];

export default bootstrapLoaders;
