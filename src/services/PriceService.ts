import { LoggerInstance } from "winston";
import { PositionEventEmitter } from "../emitters/PositionEventEmitter";
import { PriceEventEmitter } from "../emitters/priceEventEmitter";
import { PriceEvent } from "../events/PriceEvent";

export class PriceService {
    // TODO: This is only the current moving average
    // Need to store historical
    private _movingAverage: number = 0;
    // TODO: Need to configure timeunits
    private _timeUnit: string = "MINUTES";
    private _prices: number[] = [];
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
        return this._movingAverage;
    }

    private priceEventListener(priceEvent: PriceEvent) {
        // TODO: What synchronization do we need here
        this.updatePrices(priceEvent.price);
        this.updateMovingAverage();

        // You should stay in the trade until the price action breaks the
        //  50 day moving average in the opposite direction.
        // if current price is less than moving average
        if (priceEvent.price < this._movingAverage) {
            this._positionEmitter.emit("short");
        }
        // If the price meets the 50 day SMA as a support and bounces
        // upwards, you should think long.
        // If the price breaks the 50 day SMA upward, you should switch
        // your attitude to bullish.
        // if current price is equal to or greater than moving average emit
        // long event
        if (priceEvent.price >= this._movingAverage) {
            this._positionEmitter.emit("long");
        }
    }

    private updatePrices(latestPrice: number) {
        // Remove oldest price
        this._prices.shift();
        // Add latest price
        this._prices.push(latestPrice);
    }

    private updateMovingAverage() {
        this._logger.debug("updating moving average");
        let newMovingAverage = 0;
        this._prices.forEach((price) => {
            newMovingAverage = newMovingAverage + price;
        });
        newMovingAverage = newMovingAverage / this._prices.length;
    }
}
