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

    return {
        activeSubscription,
        subscriptions,
        
        getSubscriptions,
        getActiveSubscription, 
        getSubscriptionById,
        addSubscription
    }
}

export default useHome