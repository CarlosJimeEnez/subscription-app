import Badge from '@/components/shared/badge';
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
import FakeCurrencyInput from 'react-native-currency-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
      price: 0, // Use undefined for empty number input
      description: '',
      category: 'Services',
      nextPaymentDate: new Date(),
      status: 'Active',
      billingCycle: 'Monthly',
    },
  });

  const onSubmit = (data: Subscription) => {
    console.log('Submitting data:', data);
    router.back();
  };

  const billingCycle = watch('billingCycle');
  const category = watch('category');
  const topSafeArea = useSafeAreaInsets().top;
  const bottomSafeArea = useSafeAreaInsets().bottom;
  const categories: Category[] = [
    'Entertainment',
    'Music',
    'Productivity',
    'Gaming',
    'Services',
    'Other',
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#101323] " style={{ paddingTop: topSafeArea, paddingBottom: bottomSafeArea + 6 }}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 6 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="p-6">
          <Text className="text-text text-2xl font-bold text-center mb-6">
            Add Subscription
          </Text>

          {/* Service Name Input */}
          <View className="mb-7">
            <Text className="text-text text-xl font-medium pb-3">Service Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Service name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-16 bg-[#21284a] rounded-xl text-text p-5 text-xl"
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

          <View className="mb-7">
            <Text className="text-text text-xl font-medium pb-3">Precio</Text>
            <Controller
              control={control}
              name="price"
              rules={{ required: 'Price is required', min: { value: 0, message: 'Price cannot be negative' } }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FakeCurrencyInput
                  className="h-16 bg-[#21284a] rounded-xl text-text p-10 text-2xl"
                  value={value}
                  onChangeValue={
                    (val) => onChange(val === null ? 0 : val)
                  }
                  onBlur={onBlur}
                  prefix="$"
                  delimiter=","
                  separator="."
                  precision={2}
                  placeholder="$0.00"
                  placeholderTextColor="#8e99cc"
                  minValue={0}
                  renderTextInput={(textInputProps) => (
                    <TextInput
                      {...textInputProps}
                      className="h-16 bg-[#21284a] rounded-xl text-text p-5 text-xl"
                      selectionColor="#607afb"
                      keyboardType="numeric"
                    />
                  )}
                />
              )}
            />
            {errors.price && <Text className="text-red-500 mt-1">{errors.price.message}</Text>}
          </View>

          {/* Billing Cycle */}
          <View className="mb-7">
            <Text className="text-text text-xl font-medium pb-3">Billing Cycle</Text>
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
          <View className="mb-7">
            <Text className="text-text text-xl font-medium pb-3">Category</Text>
            <View className="flex-row flex-wrap">
              {categories.map((cat) => (
                // <TouchableOpacity
                //   key={cat}
                //   className={`py-2 px-4 rounded-full border border-gray-600 mr-2 mb-2 ${category === cat ? 'bg-[#607afb] border-[#607afb]' : 'bg-transparent'
                //     }`}
                //   onPress={() => setValue('category', cat)}
                // >
                //   <Text className="text-text text-lg">{cat}</Text>
                // </TouchableOpacity>
                <Badge key={cat} cat={cat} category={category} setValue={setValue} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View className="p-6 border-t border-transparent">
        <TouchableOpacity
          className="w-full items-center justify-center h-12 rounded-lg bg-[#607afb]"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-text font-bold text-base ">Add Subscription</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddSubscription;