import { LoggerInstance } from "winston";
import { PositionEventEmitter } from "../emitters/PositionEventEmitter";
import { PriceEventEmitter } from "../emitters/priceEventEmitter";
import { PriceEvent } from "../events/PriceEvent";

export class PriceService {
    private _movingAverage: number = 0;
    private _priceEmitter: PriceEventEmitter;
    private _positionEmitter: PositionEventEmitter;
    private _logger: LoggerInstance;

    constructor(priceEmitter: PriceEventEmitter,
                positionEmitter: PositionEventEmitter,
                logger: LoggerInstance) {
        this._priceEmitter = priceEmitter;
        this._priceEmitter.on("priceEvent", this.priceEventListener);

        this._positionEmitter = positionEmitter;
        this._logger = logger;
    }

    get movingAverage(): number {
        // Keep track of average price for each period, sample 50 periods, keep track of the 50 period average price
        // Operations needed
// current price, timestamp, can you get the average from the price history and keep getting it
// every x amount of time
        return this._movingAverage;
    }

    private priceEventListener(priceEvent: PriceEvent) {
            // 50 period moving average
// If the price meets the 50 day SMA as a support and bounces upwards, you should think long.
// If the price breaks the 50 day SMA upward, you should switch your attitude to bullish.
// You should stay in the trade until the price action breaks the 50 day moving average in the opposite direction.

        this.updateMovingAverage();
        // if current price is less than moving average
        this._positionEmitter.emit("short");
        // if current price is equal to or greater than moving average emit long event
        this._positionEmitter.emit("long");
    }

    private updateMovingAverage(): void {
        this._logger.log("info", "updating moving average");
    }
}
