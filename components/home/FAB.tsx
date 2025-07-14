import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

interface Props {
    clasName?: string
}

const FAB = ({clasName}: Props) => {
    return (
        <Pressable onPress={() => router.push("/subscription/add")} className='absolute bottom-5 right-5 z-50 bg-[#3A3F51] rounded-full p-5'>
            <AntDesign name="plus" size={24} color="white" />
        </Pressable>
    )
}

export default FAB