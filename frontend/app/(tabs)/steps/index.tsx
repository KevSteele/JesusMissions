import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { STEPS } from '@/constants/steps';
import { Step } from '@/types/steps';

export default function StepsScreen() {
  const router = useRouter();

  const handleStepSelect = (step: Step) => {
    router.push(`/steps/${step.id}` as any);
  };

  const renderSteps = ({ item }: { item: Step }) => (
    <TouchableOpacity
      className="rounded-xl border border-gray-200 dark:border-zinc-700 mb-3 overflow-hidden"
      onPress={() => handleStepSelect(item)}
    >
      <View className="p-4 bg-white dark:bg-zinc-900">
        <View className="mb-2">
          <Text className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
            Step {item.id}
          </Text>
        </View>

        <Text className="text-lg font-bold mb-2 leading-6 text-zinc-900 dark:text-white">
          {item.title}
        </Text>

        <Text className="text-sm text-gray-600 dark:text-gray-300" numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white dark:bg-zinc-900">
      <View className="px-5 items-center py-2"></View>

      <FlatList
        data={STEPS}
        renderItem={renderSteps}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="px-4 pb-4"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


