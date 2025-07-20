import AccentText from '@/components/shared/AccentText'
import Filter from '@/components/shared/Filter'
import ListVertical from '@/components/shared/ListVertical'
import SearchBar from '@/components/subscriptions/SearchBar'
import { useFilters } from '@/hooks/useFilters'
import useSubscriptions from '@/hooks/useSubscriptions'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SubscriptionsView = () => {
    const safeArea = useSafeAreaInsets()
    const [searchText, setSearchText] = useState('')
    const { subscriptions, filterSubscriptions } = useSubscriptions()
    const { options, selectedFilter, setLocalSelectedFilter } = useFilters()
    
    const filteredSubscriptions = filterSubscriptions(selectedFilter, searchText)
    return (
        <View className="flex-1 bg-background" style={{ paddingTop: safeArea.top }}>
            <View className="p-6">
                <Text className="text-text text-2xl font-bold">Suscripciones</Text>
            </View>


            {/* SearchBar */}
            <View className="px-6 mb-4">
                <View className='flex-row items-center justify-start gap-2 pb-3'>
                    <Ionicons name="filter" size={20} color="white" />
                    <Text className='text-text text-2xl font-bold'>Filtros</Text>
                    {/* {Filtros activos} */}
                    <AccentText label={selectedFilter} />
                </View>
                <SearchBar
                    className={'border border-gray-700 rounded-xl'} 
                    value={searchText}
                    onChangeText={setSearchText}
                    onClear={() => setSearchText('')}
                />
            </View>
            
            {/* Filtro */}
            <Filter setSelectedFilter={setLocalSelectedFilter}/>
           
           {/* Lista de suscripciones */}
           <View className="px-3 py-1 pb-6 border border-gray-700 rounded-xl mx-6">
            <Text className="text-text mt-6  text-2xl font-bold">Lista de suscripciones ({filteredSubscriptions.length})</Text>
            
            <ListVertical subscriptions={filteredSubscriptions}  />
           </View>
        </View>
    )
}

export default SubscriptionsView
