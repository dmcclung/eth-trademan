import { PositionEventEmitter } from "../emitters/PositionEventEmitter";

export function fiftyPeriodMaStrategy(
    movingAverage: number, latestPrice: number, positionEmitter: PositionEventEmitter): void {
    // You should stay in the trade until the price action breaks the
    // 50 day moving average in the opposite direction.
    if (latestPrice < movingAverage) {
        positionEmitter.emit("short");
    }
    // If the price meets the 50 day SMA as a support and bounces
    // upwards, you should think long.
    // If the price breaks the 50 day SMA upward, you should switch
    // your attitude to bullish.
    if (latestPrice >= movingAverage) {
        positionEmitter.emit("long");
    }
}
