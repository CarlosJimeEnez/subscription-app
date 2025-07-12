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

    const getActiveSubscription = (activeSubscriptionList: number[]) => {
        setActiveSubscription(activeSubscriptionList.length)
        return activeSubscription
    }

    return {
        activeSubscription,
        subscriptions,
        
        getSubscriptions,
        getActiveSubscription
    }
}

export default useHome