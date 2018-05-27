import { LoggerInstance } from "winston";
import { PositionEventEmitter } from "../emitters/PositionEventEmitter";
import { PriceEventEmitter } from "../emitters/priceEventEmitter";
import { PriceEvent } from "../events/PriceEvent";
import { SimpleMovingAverage } from "./MovingAverage";
import { priceStrategy } from "./priceStrategy";

export class PriceService {
    private _strategy: priceStrategy;
    // TODO: Now this can be updated to an array of moving averages
    private _movingAverage: SimpleMovingAverage;
    private _priceEmitter: PriceEventEmitter;
    private _positionEmitter: PositionEventEmitter;
    private _logger: LoggerInstance;

    constructor(movingAverage: SimpleMovingAverage,
                strategy: priceStrategy,
                priceEmitter: PriceEventEmitter,
                positionEmitter: PositionEventEmitter,
                logger: LoggerInstance) {
        this._strategy = strategy;
        this._movingAverage = movingAverage;
        this._positionEmitter = positionEmitter;
        this._logger = logger;

        this._priceEmitter = priceEmitter;
        this._priceEmitter.on("priceEvent", this.priceEventListener);
    }

    private priceEventListener(priceEvent: PriceEvent) {
        // check if period has elapsed
        const latestPriceTime = new Date(priceEvent.time).getTime();
        if (latestPriceTime - this._movingAverage.lastPeriod >= this._movingAverage.periodLength) {
            this._movingAverage.updatePrices(priceEvent.price);
        }
    }
}
