import { Category, Subscription } from '@/interface/subscription.interface';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  cat: Category;
  category: Category;
  setValue: UseFormSetValue<Subscription>;
}

const Badge = ({ cat, category, setValue }: Props) => {
  return (
    <TouchableOpacity
      key={cat}
      className={`py-2 px-4 rounded-full border border-gray-600 mr-2 mb-2 ${category === cat ? 'bg-[#607afb] border-[#607afb]' : 'bg-transparent'
        }`}
      onPress={() => setValue('category', cat, { shouldDirty: true })}
    >
      <Text className="text-text text-lg">{cat}</Text>
    </TouchableOpacity>
  );
};

export default Badge;