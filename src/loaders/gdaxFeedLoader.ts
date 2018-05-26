import { MicroframeworkSettings } from "microframework";
import { WebsocketClient } from "gdax"

export function gdaxFeedLoader(options?: MicroframeworkSettings) {
    if (options) {
        const logger = options.getData("logger");
        const ws = new WebsocketClient(["BTC-USD"], "wss://ws-feed.gdax.com");
        ws.on("message", () => {
            // get next message
            // parse out relevant pricing information
            // emit event used by subscriber to update 50 day moving average        
        });

        ws.on("open", () => {
            
        });

        ws.on("close", () => {

        });

        ws.on("error", () => {

        });
    }
}