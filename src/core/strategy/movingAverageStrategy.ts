import { PositionEventEmitter } from "../../emitters/PositionEventEmitter";
import { MovingAverage } from "../MovingAverage";

export type movingAverageStrategy = (
    movingAverages: MovingAverage[],
    latestPrice: number,
    positionEmitter: PositionEventEmitter) => void;
