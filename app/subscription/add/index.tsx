import { Category, Subscription } from '@/interface/subscription.interface';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddSubscription = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Subscription>({
    defaultValues: {
      name: '',
      price: undefined, // Use undefined for empty number input
      description: '',
      category: 'Services',
      nextPaymentDate: new Date(),
      status: 'Active',
      billingCycle: 'Monthly',
    },
  });

  const onSubmit = (data: Subscription) => {
    console.log('Submitting data:', data);
    // Here you would typically call an API to save the subscription
    // For now, we'll just log it and navigate back
    router.back();
  };

  const price = watch('price');
  const billingCycle = watch('billingCycle');
  const category = watch('category');

  const categories: Category[] = [
    'Entertainment',
    'Music',
    'Productivity',
    'Gaming',
    'Services',
    'Other',
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#101323]">
      <StatusBar barStyle="light-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="p-4">
          <Text className="text-text text-2xl font-bold text-center mb-6">
            Add Subscription
          </Text>

          {/* Service Name Input */}
          <View className="mb-5">
            <Text className="text-text text-base font-medium pb-2">Service Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Service name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-14 bg-[#21284a] rounded-xl text-text p-4 text-base"
                  placeholder="e.g., Netflix, Spotify..."
                  placeholderTextColor="#8e99cc"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && <Text className="text-red-500 mt-1">{errors.name.message}</Text>}
          </View>

          <View className="mb-5">
            <Text className="text-text text-base font-medium pb-2">Service Name</Text>
            <Controller
              control={control}
              name="price"
              rules={{ required: 'Price is required', min: { value: 0, message: 'Price must be greater than 0' } }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-14 bg-[#21284a] rounded-xl text-text p-4 text-base"
                  placeholder="$"
                  placeholderTextColor="#8e99cc"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    // Solo permite números y un punto decimal
                    const numericValue = text.replace(/[^0-9.]/g, '');
                    // Asegura que solo hay un punto decimal
                    const validValue = numericValue.replace(/\.(?=.*\.)/g, '');
                    onChange(validValue);
                  }}
                  value={value ? value.toString() : ''}
                />
              )}
            />
            {errors.price && <Text className="text-red-500 mt-1">{errors.price.message}</Text>}
          </View>

          {/* Billing Cycle */}
          <View className="mb-5">
            <Text className="text-text text-base font-medium pb-2">Billing Cycle</Text>
            <View className="flex-row">
              <TouchableOpacity
                className={`flex-1 items-center justify-center h-12 rounded-lg mr-2 ${billingCycle === 'Monthly' ? 'bg-[#607afb]' : 'bg-[#21284a]'
                  }`}
                onPress={() => setValue('billingCycle', 'Monthly')}
              >
                <Text className="text-text font-bold">Monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 items-center justify-center h-12 rounded-lg ml-2 ${billingCycle === 'Yearly' ? 'bg-[#607afb]' : 'bg-[#21284a]'
                  }`}
                onPress={() => setValue('billingCycle', 'Yearly')}
              >
                <Text className="text-text font-bold">Yearly</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Category */}
          <View className="mb-5">
            <Text className="text-text text-base font-medium pb-2">Category</Text>
            <View className="flex-row flex-wrap">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  className={`py-2 px-4 rounded-full border border-gray-600 mr-2 mb-2 ${category === cat ? 'bg-[#607afb] border-[#607afb]' : 'bg-transparent'
                    }`}
                  onPress={() => setValue('category', cat)}
                >
                  <Text className="text-text">{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View className="p-4 border-t border-transparent">
        <TouchableOpacity
          className="w-full items-center justify-center h-12 rounded-lg bg-[#607afb]"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-text font-bold text-base">Add Subscription</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddSubscription;