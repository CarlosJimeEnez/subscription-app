export class FormatPrice {
    public static format(price: number) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
    }
}