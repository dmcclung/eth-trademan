import { PositionEventEmitter } from "../../emitters/PositionEventEmitter";
import { MovingAverage } from "../MovingAverage";

// Simplified fifty period moving average strategy
export function fiftyPeriodMovingAverageStrategy(
    movingAverages: MovingAverage[], latestPrice: number, positionEmitter: PositionEventEmitter): void {

    if (movingAverages[0].movingAveragePeriods !== 50) {
        throw new TypeError("Expected moving average of 50 periods");
    }

    const movingAverage = movingAverages[0];

    // You should stay in the trade until the price action breaks the
    // 50 day moving average in the opposite direction.
    if (latestPrice < movingAverage.current) {
        positionEmitter.emit("short", latestPrice);
    }
    // If the price breaks the 50 day SMA upward, you should switch
    // your attitude to bullish.
    if (latestPrice >= movingAverage.current) {
        positionEmitter.emit("long", latestPrice);
    }
}
