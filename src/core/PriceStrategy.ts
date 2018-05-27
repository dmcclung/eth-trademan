import { PositionEventEmitter } from "../emitters/PositionEventEmitter";

export type priceStrategy = (
    movingAverage: number,
    latestPrice: number,
    positionEmitter: PositionEventEmitter) => void;
