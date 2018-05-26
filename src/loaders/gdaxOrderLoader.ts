import { AuthenticatedClient } from "gdax";
import { MicroframeworkSettings } from "microframework";
import { PositionEventEmitter } from "../emitters/PositionEventEmitter";

export function gdaxOrderLoader(options?: MicroframeworkSettings) {
    if (options) {
        const key = process.env.API_KEY as string;
        const secret = process.env.API_SECRET as string;
        const passphrase = process.env.API_PASS as string;

        const apiURI = process.env.NODE_ENV !== "production" ?
            "https://api-public.sandbox.gdax.com" :
            "https://api.gdax.com";

        const authedClient = new AuthenticatedClient(
            key, secret, passphrase, apiURI,
        );

        const positionEmitter = options.getData("positionEmitter") as PositionEventEmitter;
        positionEmitter.on("long", () => {
            // need up to date USD balance to place a limit order post-only

        });

        positionEmitter.on("short", () => {
            // need up to date BTC balance to sell it all
        });
    }
}
