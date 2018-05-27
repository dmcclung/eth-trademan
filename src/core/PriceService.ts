import { LoggerInstance } from "winston";
import { PositionEventEmitter } from "../emitters/PositionEventEmitter";
import { PriceEventEmitter } from "../emitters/priceEventEmitter";
import { PriceEvent } from "../events/PriceEvent";
import { MovingAverage } from "./MovingAverage";
import { movingAverageStrategy } from "./strategy/movingAverageStrategy";

export class PriceService {
    private strategy: movingAverageStrategy;
    private movingAverages: MovingAverage[];
    private priceEmitter: PriceEventEmitter;
    private positionEmitter: PositionEventEmitter;
    private logger: LoggerInstance;

    constructor(movingAverages: MovingAverage[],
                strategy: movingAverageStrategy,
                priceEmitter: PriceEventEmitter,
                positionEmitter: PositionEventEmitter,
                logger: LoggerInstance) {
        this.strategy = strategy;
        this.movingAverages = movingAverages;
        this.positionEmitter = positionEmitter;
        this.logger = logger;

        this.priceEmitter = priceEmitter;
        this.priceEmitter.on("priceEvent", this.priceEventListener);
    }

    private priceEventListener(priceEvent: PriceEvent) {
        const latestPriceTime = new Date(priceEvent.time).getTime();
        const latestPrice = priceEvent.price;
        this.movingAverages.forEach((mvAvg) => {
            if (latestPriceTime - mvAvg.lastPeriod >= mvAvg.periodLength) {
                mvAvg.updatePrices(latestPrice);
            }
        });
        this.strategy(this.movingAverages, latestPrice, this.positionEmitter);
    }
}
