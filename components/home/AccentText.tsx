import { formatDay } from '@/helpers/formatDay'
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
    label: string
}

const AccentText = ({ label }: Props) => {
    if (!label) return null;

    // Regex to check if the label is in YYYY-MM-DD format
    const isDate = /^\d{4}-\d{2}-\d{2}$/.test(label);

    const displayText = isDate ? formatDay(label) : label;

    return (
        <View>
            <Text className='text-sm font-normal leading-normal text-[#c4cbe6] px-3 bg-[#3A3F51] rounded-full'>
                {displayText}
            </Text>
        </View>
    )
}

export default AccentText;