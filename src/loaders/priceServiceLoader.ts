import { MicroframeworkSettings } from "microframework";
import { PositionEventEmitter } from "../emitters/PositionEventEmitter";
import { PriceService } from "../services/PriceService";

export function priceServiceLoader(options?: MicroframeworkSettings) {
    if (options) {
        const priceEmitter = options.getData("priceEmitter");
        const positionEventEmitter = options.getData("positionEmitter");
        const logger = options.getData("logger");

        const priceService = new PriceService(priceEmitter, positionEventEmitter, logger);
        options.setData("priceService", priceService);
    }

}
