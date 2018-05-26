import { MicroframeworkSettings } from "microframework";
import { PriceService } from "../services/PriceService";

export function priceServiceLoader(options?: MicroframeworkSettings) {
    if (options) {
        const priceEmitter = options.getData("priceEmitter");

        const priceService = new PriceService(priceEmitter);
        options.setData("priceService", priceService);
    }

}
