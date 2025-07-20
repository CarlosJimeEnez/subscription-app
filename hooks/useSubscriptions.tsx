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

    const filterSubscriptions = (filter: string) => {
        console.log(filter)
        if(filter === 'All') {
            return subscriptions
        }
        else if(filter === 'Active') {
            return subscriptions.filter((item) => item.status === 'Active')
        }
        else if(filter === 'Inactive') {
            return subscriptions.filter((item) => item.status === 'Inactive')
        }
        else if(filter === 'Monthly') {
            return subscriptions.filter((item) => item.billingCycle === 'Monthly')
        }
        else if(filter === 'Yearly') {
            return subscriptions.filter((item) => item.billingCycle === 'Yearly')
        }

        return subscriptions
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