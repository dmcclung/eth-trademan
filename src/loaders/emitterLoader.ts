import { MicroframeworkSettings } from "microframework";
import { PositionEventEmitter } from "../emitters/PositionEventEmitter";
import { PriceEventEmitter } from "../emitters/priceEventEmitter";

export function emitterLoader(options?: MicroframeworkSettings) {
    if (options) {
        const priceEmitter = new PriceEventEmitter();
        options.setData("priceEmitter", priceEmitter);

        const positionEmitter = new PositionEventEmitter();
        options.setData("positionEmitter", positionEmitter);
    }
}
