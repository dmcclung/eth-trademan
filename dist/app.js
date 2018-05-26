"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microframework_1 = require("microframework");
microframework_1.bootstrapMicroframework([])
    .then(() => console.log("Application is running"))
    .catch((error) => console.log("Application error: " + error));
// 50 period moving average
// If the price meets the 50 day SMA as a support and bounces upwards, you should think long.
// If the price breaks the 50 day SMA upward, you should switch your attitude to bullish.
// You should stay in the trade until the price action breaks the 50 day moving average in the opposite direction.
// Keep track of average price for each period, sample 50 periods, keep track of the 50 period average price
// compare price to 50 period average, buy, if it comes back down sell quickly with maker order
// limit order post-only
// Operations needed
// current price, timestamp, can you get the average from the price history and keep getting it 
// every x amount of time
// buy order
// sell order
// use process.env to pick up API user and password
// in addition to authenticated client
// need a start and shutdown call at least
// could use a status page that tells me what is happening realtime order wise, maybe even graph the 
// 50 day moving average or whatever period
// Need two loaders, one for the feed and another for the order execution and strategy
// Need a way of broadcasting events through my app
// To put new information into the page
// To make order decisions
