
export function average(prices: number[]): number {
    let sum = 0;
    prices.forEach((price) => {
        sum = sum + price;
    });
    return sum / prices.length;
}
