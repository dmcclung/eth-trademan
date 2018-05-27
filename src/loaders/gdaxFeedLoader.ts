import { WebsocketClient, WebsocketMessage } from "gdax";
import { MicroframeworkSettings } from "microframework";
import { PriceEventEmitter } from "../emitters/priceEventEmitter";
import { PriceEvent } from "../events/PriceEvent";

export function gdaxFeedLoader(options?: MicroframeworkSettings) {
    if (options) {
        const priceEmitter = options.getData("priceEmitter") as PriceEventEmitter;
        const logger = options.getData("logger");
        const ws = new WebsocketClient(["BTC-USD"], "wss://ws-feed.gdax.com", undefined,
            { channels: ["matches"] });

        ws.on("message", (data: WebsocketMessage) => {
            if (data.type === "match") {
                const match = data as WebsocketMessage.Match;
                const price = parseFloat(match.price);
                const time = match.time;
                priceEmitter.emit("price", new PriceEvent(price, time));
            }
        });

        ws.on("open", () => {
            logger.info("GDAX feed is open");
        });

        ws.on("close", () => {
            logger.info("GDAX feed is closed");
        });

        ws.on("error", (err) => {
            logger.info("Error GDAX feed: " + err);
        });
    }
}
