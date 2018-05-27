export class PriceEvent {
    private _price: number;
    private _time: string;

    constructor(price: number, time: string) {
        this._price = price;
        this._time = time;
    }

    get price(): number {
        return this._price;
    }

    get time(): string {
        return this._time;
    }
}
