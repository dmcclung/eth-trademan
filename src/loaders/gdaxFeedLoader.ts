import { MicroframeworkSettings } from "microframework";
import WebSocket from "ws";

export function gdaxFeedLoader(options?: MicroframeworkSettings) {
    const ws = new WebSocket("ws");
    ws.on("message", () => {
        // get next message
        // parse out relevant pricing information
        // emit event used by subscriber to update 50 day moving average        

    });
}