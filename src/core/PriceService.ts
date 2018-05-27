import { LoggerInstance } from "winston";
import { PositionEventEmitter } from "../emitters/PositionEventEmitter";
import { PriceEventEmitter } from "../emitters/priceEventEmitter";
import { PriceEvent } from "../events/PriceEvent";
import { PriceStrategy } from "./PriceStrategy";

export class PriceService {
    

    private _priceStrategy: PriceStrategy;

    private _priceEmitter: PriceEventEmitter;
    private _positionEmitter: PositionEventEmitter;
    private _logger: LoggerInstance;

    constructor(movingAveragePeriods: number,
                periodLength: number,
                priceStrategy: PriceStrategy,
                priceEmitter: PriceEventEmitter,
                positionEmitter: PositionEventEmitter,
                logger: LoggerInstance) {
        this._periodLength = periodLength;
        this._movingAveragePeriods = movingAveragePeriods;
        this._priceStrategy = priceStrategy;

        this._priceEmitter = priceEmitter;
        this._priceEmitter.on("priceEvent", this.priceEventListener);

        this._positionEmitter = positionEmitter;
        this._logger = logger;
    }

    get movingAverage(): number {
        return this._movingAverage;
    }

    private priceEventListener(priceEvent: PriceEvent) {
        // check if period has elapsed
        const latestPriceTime = new Date(priceEvent.time).getTime();
        if (latestPriceTime - this._lastPeriod >= this._periodLength) {
            this.updatePrices(priceEvent.price);
            this._movingAverage = this.average(this._prices);
        }

        this._priceStrategy(this._movingAverage, priceEvent.price);
    }

    private updatePrices(latestPrice: number) {
        // Remove oldest price
        if (this._prices.length === this._movingAveragePeriods) {
            this._prices.shift();
        }
        // Add latest price
        this._prices.push(latestPrice);
    }

    private average(prices: number[]): number {
        let sum = 0;
        prices.forEach((price) => {
            sum = sum + price;
        });
        return sum / prices.length;
    }
}
