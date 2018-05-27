
export type 

// TODO: this part needs to be the strategy
        // You should stay in the trade until the price action breaks the
        //  50 day moving average in the opposite direction.
        // if current price is less than moving average
        if (priceEvent.price < this._movingAverage) {
            this._positionEmitter.emit("short");
        }
        // If the price meets the 50 day SMA as a support and bounces
        // upwards, you should think long.
        // If the price breaks the 50 day SMA upward, you should switch
        // your attitude to bullish.
        // if current price is equal to or greater than moving average emit
        // long event
        if (priceEvent.price >= this._movingAverage) {
            this._positionEmitter.emit("long");
        }