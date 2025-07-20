import temporalDb from '@/db/temporal';
import { Subscription } from '@/interface/subscription.interface';
import { useEffect, useState } from 'react';

const useHome = () => {
    const [activeSubscription, setActiveSubscription] = useState(0)
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const {subscriptionsDb} = temporalDb()

    useEffect(() => {
        getSubscriptions()
    }, [])

    const getSubscriptions = () => {
        setSubscriptions(subscriptionsDb)
    }

    const getSubscriptionById = (id: string) => {
        return subscriptionsDb.find((item) => item.id === id) 
    }

    const getActiveSubscription = (activeSubscriptionList: number[]) => {
        setActiveSubscription(activeSubscriptionList.length)
        return activeSubscription
    }

    const addSubscription = (subscription: Subscription) => {
        setSubscriptions([...subscriptions, subscription])
    }

    const filterSubscriptions = (filter: string, searchQuery: string = '') => {
        // First filter by category/status
        let filteredResults = subscriptions;
        
        if(filter === 'All') {
            filteredResults = subscriptions
        }
        else if(filter === 'Active') {
            filteredResults = subscriptions.filter((item) => item.status === 'Active')
        }
        else if(filter === 'Cancelled') {
            filteredResults = subscriptions.filter((item) => item.status === 'Cancelled')
        }
        else if(filter === 'Monthly') {
            filteredResults = subscriptions.filter((item) => item.billingCycle === 'Monthly')
        }
        else if(filter === 'Yearly') {
            filteredResults = subscriptions.filter((item) => item.billingCycle === 'Yearly')
        }

        // Then filter by search text if provided
        if (searchQuery && searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            filteredResults = filteredResults.filter((item) => 
                item.name.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query) || 
                item.category.toLowerCase().includes(query)
            );
        }

        return filteredResults;
    }

    return {
        activeSubscription,
        subscriptions,
        
        getSubscriptions,
        getActiveSubscription, 
        getSubscriptionById,
        addSubscription,
        filterSubscriptions
    }
}

export default useHome