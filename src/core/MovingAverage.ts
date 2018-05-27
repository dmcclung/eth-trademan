import { average } from "./MaMath";

export class SimpleMovingAverage {
    // current moving average
    private _movingAverage: number = 0;
    // prices over time periods
    private _prices: number[] = [];
    // periods in moving average
    private _movingAveragePeriods: number;
    // timestamp of last period closing
    private _lastPeriod: number = Date.now();
    // period length
    private _periodLength: number;

    constructor(movingAveragePeriods: number, periodLength: number) {
        this._periodLength = periodLength;
        this._movingAveragePeriods = movingAveragePeriods;
    }

    get movingAverage(): number {
        return this._movingAverage;
    }

    get periodLength(): number {
        return this._periodLength;
    }

    get lastPeriod(): number {
        return this._lastPeriod;
    }

    public updatePrices(latestPrice: number) {
        // Remove oldest price
        if (this._prices.length === this._movingAveragePeriods) {
            this._prices.shift();
        }
        // Add latest price
        this._prices.push(latestPrice);

        this._movingAverage = average(this._prices);
    }
}
