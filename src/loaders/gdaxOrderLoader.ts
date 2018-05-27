import { Account, AuthenticatedClient, LimitOrder } from "gdax";
import { MicroframeworkSettings } from "microframework";
import { PositionEventEmitter } from "../emitters/PositionEventEmitter";

export async function gdaxOrderLoader(options?: MicroframeworkSettings) {
    if (options) {
        const logger = options.getData("logger");

        const key = process.env.API_KEY as string;
        const secret = process.env.API_SECRET as string;
        const passphrase = process.env.API_PASS as string;

        const apiURI = process.env.NODE_ENV !== "production" ?
            "https://api-public.sandbox.gdax.com" :
            "https://api.gdax.com";

        const authedClient = new AuthenticatedClient(
            key, secret, passphrase, apiURI,
        );

        const accounts: Account[] = await authedClient.getAccounts();
        let usdAccountId: string;
        let btcAccountId: string;
        accounts.forEach( (account) => {
            if (account.currency === "USD") {
                usdAccountId = account.profile_id;
            } else if (account.currency === "BTC") {
                btcAccountId = account.profile_id;
            } else {
                throw new TypeError("Unexpected acccount: " + account);
            }
        });

        const positionEmitter = options.getData("positionEmitter") as PositionEventEmitter;
        positionEmitter.on("long", (price: number) => {
            authedClient.getAccount(usdAccountId, (err, response, data: Account) => {
                const orderTotal = Number(data.balance);
                const orderPrice = price - 0.01;
                const size = orderTotal / orderPrice;

                const limitOrder: LimitOrder = {
                    post_only: true,
                    price: String(orderPrice),
                    product_id: "BTC-USD",
                    side: "buy",
                    size: String(size),
                    type: "limit",
                };

                authedClient.placeOrder(limitOrder)
                    .then(() => { logger.info("Order successful"); })
                    .catch((error) => { logger.error(err); });
            });
        });

        positionEmitter.on("short", (price: number) => {
            authedClient.getAccount(btcAccountId, (err, response, data: Account) => {
                const btcTotal = data.balance;
                const orderPrice = price + 0.01;
                const limitOrder: LimitOrder = {
                    post_only: true,
                    price: String(orderPrice),
                    product_id: "BTC-USD",
                    side: "sell",
                    size: btcTotal,
                    type: "limit",
                };

                authedClient.placeOrder(limitOrder)
                    .then(() => { logger.info("Order successful"); })
                    .catch((error) => { logger.error(err); });
            });
        });
    }
}
