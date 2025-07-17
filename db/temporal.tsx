import { Subscription } from "@/interface/subscription.interface";

const temporalDb = () => {

    const subscriptionsDb: Subscription[] = [
        {
            id: '1',
            name: 'Spotify',
            price: 9.99,
            description: 'Music Streaming Service',
            category: 'Music',
            nextPaymentDate: new Date('2025-07-25'),
            status: 'Active',
            billingCycle: 'Monthly'
        },
        {
            id: '2',
            name: 'Netflix',
            price: 15.49,
            description: 'Video Streaming Service',
            category: 'Entertainment',
            nextPaymentDate: new Date('2025-08-01'),
            status: 'Active',
            billingCycle: 'Monthly'
        },
        {
            id: '3',
            name: 'Amazon Prime',
            price: 139,
            description: 'Subscription with multiple benefits',
            category: 'Services',
            nextPaymentDate: new Date('2026-01-15'),
            status: 'Active',
            billingCycle: 'Yearly'
        },
        {
            id: '4',
            name: 'iCloud',
            price: 2.99,
            description: 'Cloud Storage',
            category: 'Productivity',
            nextPaymentDate: new Date('2025-07-20'),
            status: 'Cancelled',
            billingCycle: 'Monthly'
        },
        {
            id: '5',
            name: 'Xbox Game Pass',
            price: 14.99,
            description: 'Gaming Subscription',
            category: 'Gaming',
            nextPaymentDate: new Date('2025-08-10'),
            status: 'Active',
            billingCycle: 'Monthly'
        }
    ];

    return {
        subscriptionsDb
    }
}

export default temporalDb

