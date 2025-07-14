import AccentText from '@/components/home/AccentText';
import DetailRow from '@/components/subscriptionDetail/DetailRow';
import { formatDay } from '@/helpers/formatDay';
import { FormatPrice } from '@/helpers/formatPrice';
import { getCategoryIcon } from '@/helpers/getCategoryIcon';
import useHome from '@/hooks/useSubscriptions';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SubscriptionDetail = () => {
    const safeArea = useSafeAreaInsets()
    const {id} = useLocalSearchParams<{id: string}>()
    const {getSubscriptionById} = useHome()
    const subscription = getSubscriptionById(id)
    
    if (!subscription) {
        return <Text>Subscription not found</Text>;
    }

    const getIconName = getCategoryIcon(subscription.category)
    return (
        <View className="flex-1 bg-[#101323]">
            <ScrollView style={{ paddingTop: safeArea.top }}>
                {/* Custom Header */}
                <View className="flex-row items-center p-4 pb-2 justify-between">
                    <Pressable onPress={() => router.back()} className="flex size-12 shrink-0 items-center justify-center -ml-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text className="text-white text-lg font-bold flex-1 text-center">{subscription.name} Details</Text>
                    <View className="size-8" />{/* Spacer */}
                </View>

                {/* Main Content */}
                <View className="p-4">
                    <View className="flex flex-col items-stretch justify-start rounded-xl">
                        <View className="w-full aspect-video rounded-xl bg-[#21284a] items-center justify-center">
                            <Ionicons name={getIconName} size={64} color="white" />
                        </View>
                        <View className="flex w-full grow flex-col items-stretch justify-center gap-1 py-4">
                            <Text className="text-white text-lg font-bold">{subscription.name}</Text>
                            <View className="flex-col gap-1">
                                <View className='flex-row items-center justify-between gap-2'>
                                <AccentText label={subscription.billingCycle} />
                                {/* <Text className="text-[#8e99cc] text-base font-normal">{subscription.billingCycle}</Text> */}
                                <Text className="text-text text-2xl font-normal">{FormatPrice.format(subscription.price)}</Text>
                                </View>
                                <Text className="text-[#8e99cc] text-base font-normal">Next payment: {formatDay(subscription.nextPaymentDate)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Details Section */}
                <View className="px-4">
                    <Text className="text-white text-lg font-bold pb-2 pt-4">Details</Text>
                    <DetailRow label="Category" value={subscription.category} />
                    <DetailRow label="Billing Cycle" value={subscription.billingCycle} />
                    <DetailRow label="Status" value={subscription.status} />
                    <DetailRow label="Notes" value={subscription.description || 'No notes'} />
                </View>

            </ScrollView>

            {/* Action Buttons */}
            <View className="flex-row gap-3 px-4 py-3 justify-between border-t border-t-transparent">
                <Pressable className="flex-1 items-center justify-center rounded-xl h-12 bg-[#21284a] flex-row gap-2">
                    <Ionicons name="pencil-outline" size={16} color="white" />
                    <Text className="text-white text-sm font-bold">Edit</Text>
                </Pressable>
                <Pressable className="flex-1 items-center justify-center rounded-xl h-12 bg-red-500 flex-row gap-2">
                    <Ionicons name="trash-outline" size={16} color="white" />
                    <Text className="text-white text-medium font-bold">Delete</Text>
                </Pressable>
            </View>

        </View>
    );
};

export default SubscriptionDetail