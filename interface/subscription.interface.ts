export type Status = "Active" | "Cancelled";
export type BillingCycle = "Monthly" | "Yearly";
export type Category = "Music" | "Entertainment" | "Services" | "Productivity" | "Gaming" | "Other"; 

export interface Subscription {
    id: string;
    name: string;
    price: number;
    description: string;
    category: Category;
    nextPaymentDate: Date;
    status: Status;
    billingCycle: BillingCycle;
}
