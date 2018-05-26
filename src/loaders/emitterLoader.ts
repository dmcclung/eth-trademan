import { MicroframeworkSettings } from "microframework";
import { PriceEventEmitter } from "../emitters/priceEventEmitter";

export function emitterLoader(options?: MicroframeworkSettings) {
    if (options) {
        const priceEmitter = new PriceEventEmitter();
        options.setData("priceEmitter", priceEmitter);
    }
}
