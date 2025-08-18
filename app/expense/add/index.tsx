import { getCategoryIcon } from '@/helpers/getCategoryIcon';
import { Category, PaymentType } from '@/interface/category-expenses.interface';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const categories: { key: Category; label: string }[] = [
    { key: 'alimentos', label: 'Comida' },
    { key: 'transporte', label: 'Transporte' },
    { key: 'salud', label: 'Salud' },
    { key: 'entretenimiento', label: 'Entretenimiento' },
    { key: 'productividad', label: 'Productividad' },
    { key: 'otros', label: 'Otros' }
];

const AddExpense = () => {
    const safeArea = useSafeAreaInsets();
    const [amount, setAmount] = useState('12.00');
    const [selectedCategory, setSelectedCategory] = useState<Category>('alimentos');
    const [paymentType, setPaymentType] = useState<PaymentType>('cash');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const handleSaveDraft = () => {
        Alert.alert('Draft Saved', 'Your expense has been saved as draft');
    };

    const handleAddExpense = () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Please enter a valid amount');
            return;
        }

        // Aquí iría la lógica para guardar el gasto
        Alert.alert('Success', 'Expense added successfully', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    const PaymentTypeOption = ({ type, label, selected, onPress }: {
        type: PaymentType;
        label: string;
        selected: boolean;
        onPress: () => void;
    }) => (
        <Pressable
            onPress={onPress}
            className={`flex-row items-center p-4 rounded-xl mb-3 self-start  ${selected ? 'border-2 border-green-500' : 'border-2 border-transparent text-text'

                }`}
        >
            <View className={`w-5 h-5 rounded-full border-2 mr-3 ${selected ? 'border-green-500 bg-green-500' : 'border-gray-400'
                }`}>
                {selected && <View className="w-2 h-2 bg-white rounded-full m-auto" />}
            </View>
            <Text className={`text-base ${selected ? 'text-green-600 font-semibold' : 'text-text'
                }`}>
                {label}
            </Text>
        </Pressable>
    );

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: safeArea.top }}>

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 bg-background">
                <Pressable onPress={() => router.back()} className="p-2">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Text className="text-xl font-semibold text-text">Nuevo Gasto</Text>
                <View className="w-8" />
            </View>

            <ScrollView className="flex-1 px-5 py-6">
                {/* Amount Section */}
                <View className="bg-secondary rounded-2xl p-6 mb-6 border border-gray-700">

                    <Text className="text-text text-xl mb-2">Monto</Text>
                    <TextInput
                        value={`$${amount}`}
                        onChangeText={(text) => setAmount(text.replace('$', ''))}
                        className="text-3xl font-bold text-text"
                        keyboardType="numeric"
                        placeholder="$0.00"
                    />
                </View>

                {/* Category Section */}
                <View className="bg-secondary rounded-2xl p-6 mb-6 ">
                    <Text className="text-text text-xl mb-4">Categoria</Text>

                    {/* Categorias */}
                    <Pressable
                        onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        className="flex-row items-center justify-between p-4 border border-gray-600 rounded-xl"

                    >
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 bg-white rounded-full items-center justify-center mr-3">
                                <Ionicons
                                    name={getCategoryIcon(selectedCategory)}
                                    size={18}
                                    color="green"
                                />
                            </View>
                            <Text className="text-text font-medium">
                                {categories.find(cat => cat.key === selectedCategory)?.label}
                            </Text>
                        </View>
                        <ChevronDown size={20} color="white" />
                    </Pressable>

                    {/* Category Dropdown */}
                    {showCategoryDropdown && (
                        <View className="mt-3 bg-background rounded-xl overflow-hidden">

                            {categories.map((category) => (
                                <Pressable
                                    key={category.key}
                                    onPress={() => {
                                        setSelectedCategory(category.key);
                                        setShowCategoryDropdown(false);
                                    }}
                                    className="flex-row items-center p-4 border-b border-gray-200 last:border-b-0"
                                >
                                    <View className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center mr-3">
                                        <Ionicons
                                            name={getCategoryIcon(category.key)}
                                            size={18}
                                            color="#6b7280"
                                        />
                                    </View>
                                    <Text className="text-text">{category.label}</Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>

                {/* Payment Type Section */}
                <View className="bg-background rounded-2xl p-6 mb-8 shadow-sm">
                    <Text className="text-text text-xl mb-4">Método de Pago</Text>
                    
                    {/* Grid de badges */}
                    <View className="flex-row flex-wrap gap-3">
                      <Pressable
                        onPress={() => setPaymentType('cash')}
                        className={`px-4 py-3 rounded-xl border-2 ${
                          paymentType === 'cash' 
                            ? 'border-white bg-green-900' 
                            : 'bg-secondary border-gray-700'

                        }`}
                      >
                        <Text className={`text-sm font-medium ${
                          paymentType === 'cash' 
                            ? 'text-white' 
                            : 'text-text'
                        }`}>
                          Efectivo
                        </Text>
                      </Pressable>
                    
                      <Pressable
                        onPress={() => setPaymentType('card')}
                        className={`px-4 py-3 rounded-xl border-2 ${
                          paymentType === 'card' 
                            ? 'border-white bg-green-900' 
                            : 'bg-secondary border-gray-700'
                        }`}
                      >
                        <Text className={`text-sm font-medium ${
                          paymentType === 'card' 
                            ? 'text-white' 
                            : 'text-text'
                        }`}>
                          Tarjeta de Crédito/Débito
                        </Text>
                      </Pressable>
                    
                      <Pressable
                        onPress={() => setPaymentType('check')}
                        className={`px-4 py-3 rounded-xl border-2 ${
                          paymentType === 'check' 
                            ? 'border-white bg-green-900' 
                            : 'bg-secondary border-gray-700'
                        }`}
                      >
                        <Text className={`text-sm font-medium ${
                          paymentType === 'check' 
                            ? 'text-white' 
                            : 'text-text'
                        }`}>
                          Cheque
                        </Text>
                      </Pressable>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Buttons */}
            <View className="flex-row px-5 pb-6 pt-4 bg-secondary">
                <Pressable
                    onPress={handleAddExpense}
                    className="flex-1 ml-3 py-4 rounded-2xl bg-green-600 items-center"
                >
                    <Text className="text-white font-semibold text-lg">Agregar</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default AddExpense;