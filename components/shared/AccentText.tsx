import { formatDay } from '@/helpers/formatDay'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
interface Props {
    label: string
    IonIconName?: React.ComponentProps<typeof Ionicons>['name'];
}

const AccentText = ({ label, IonIconName }: Props) => {
    if (!label) return null;

    // Regex to check if the label is in YYYY-MM-DD format
    const isDate = /^\d{4}-\d{2}-\d{2}$/.test(label);

    const displayText = isDate ? formatDay(new Date(label)) : label;

    return (
        <View>
            <View className='text-sm font-normal leading-normal px-3 py-1 justify-between flex flex-row items-center gap-2 text-[#c4cbe6]  bg-[#3A3F51] rounded-full'>
                {IonIconName && (
                    <Ionicons name={IonIconName} size={12} color="white" />
                )}
                <Text className='text-sm font-normal leading-normal text-[#c4cbe6]'>
                    {displayText}
                </Text>
            </View>
        </View>
    )
}

export default AccentText;