import { MicroframeworkSettings } from "microframework";
import moment from "moment";
import { MovingAverage } from "../core/MovingAverage";
import { PriceService } from "../core/PriceService";
import { fiftyPeriodMovingAverageStrategy } from "../core/strategy/fiftyPeriodMovingAverageStrategy";

export function priceServiceLoader(options?: MicroframeworkSettings) {
    if (options) {
        const priceEmitter = options.getData("priceEmitter");
        const positionEventEmitter = options.getData("positionEmitter");
        const logger = options.getData("logger");

        const day = moment.duration(24, "hours").milliseconds();

        const priceService = new PriceService(
            [new MovingAverage(50, day)],
            fiftyPeriodMovingAverageStrategy,
            priceEmitter,
            positionEventEmitter,
            logger);
        options.setData("priceService", priceService);
    }

}
