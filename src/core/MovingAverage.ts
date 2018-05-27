export class MovingAverage {
    // timestamp of last period closing
    private _lastPeriod: number = Date.now();
    // period length
    private _periodLength: number;
    // periods in moving average
    private _movingAveragePeriods: number;
    // prices over time periods
    private prices: number[] = [];

    constructor(movingAveragePeriods: number, periodLength: number) {
        this._periodLength = periodLength;
        this._movingAveragePeriods = movingAveragePeriods;
    }

    get current(): number {
        let sum = 0;
        this.prices.forEach((price) => {
            sum = sum + price;
        });
        return sum / this.prices.length;
    }

    get periodLength(): number {
        return this._periodLength;
    }

    get lastPeriod(): number {
        return this._lastPeriod;
    }

    get movingAveragePeriods(): number {
        return this._movingAveragePeriods;
    }

    public updatePrices(latestPrice: number) {
        // Remove oldest price
        if (this.prices.length === this._movingAveragePeriods) {
            this.prices.shift();
        }
        // Add latest price
        this.prices.push(latestPrice);
    }
}
