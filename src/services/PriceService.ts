import { PriceEventEmitter } from "../emitters/priceEventEmitter";
import { PriceEvent } from "../events/PriceEvent";

export class PriceService {
    private _movingAverage: number = 0;
    private _priceEmitter: PriceEventEmitter;

    constructor(priceEmitter: PriceEventEmitter) {
        this._priceEmitter = priceEmitter;
        this._priceEmitter.on("priceEvent", this.priceEventListener);
    }

    get movingAverage(): number {
        return this._movingAverage;
    }

    private priceEventListener(priceEvent: PriceEvent) {
        // emit sell order
        // emit buy order
    }
}
