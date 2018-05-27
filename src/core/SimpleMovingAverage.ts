
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
    
}