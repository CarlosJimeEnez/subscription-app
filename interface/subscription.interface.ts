export interface Subscription {
    id: string;
    name: string;
    price: number;
    description: string;
    category: Category;
    nextPaymentDate: Date;
    status: string;
    billingCycle: BillingCycle;
}
export type BillingCycle = "Monthly" | "Yearly";
export type Category = "Music" | "Entertainment" | "Services" | "Productivity" | "Gaming" | "Other";