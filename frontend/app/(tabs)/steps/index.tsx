import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { STEPS } from '@/constants/steps';
import { Step } from '@/types/steps';
import mountainBackground from '@/assets/images/mountainBackground.jpg';

export default function StepsScreen() {
  const router = useRouter();

  const handleStepSelect = (step: Step) => {
    router.push(`/steps/${step.id}` as any);
  };

  const renderSteps = ({ item }: { item: Step }) => (
    <TouchableOpacity
      className="rounded-2xl bg-white dark:bg-zinc-800 mb-6 overflow-hidden"
      onPress={() => handleStepSelect(item)}
      activeOpacity={0.9}
    >
      <View className="p-6">
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 rounded-full bg-blue-600 items-center justify-center mr-3">
            <Text className="text-white text-lg font-bold">
              {item.id}
            </Text>
          </View>
          <Text className="flex-1 text-xl font-bold leading-6 text-zinc-900 dark:text-white">
            {item.title}
          </Text>
        </View>

        <Text className="text-base text-gray-600 dark:text-gray-300 leading-6" numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={mountainBackground} className="flex-1" resizeMode="cover">
      <View className="flex-1 bg-white/30 dark:bg-zinc-900/30">
        {/* Hero Section */}
        <View className="px-6 pt-12 pb-8">
          <Text className="text-3xl font-bold text-white text-center mb-2">
            Your Mission Journey
          </Text>
          <Text className="text-lg text-white/90 text-center">
            Follow these steps to make an impact
          </Text>
        </View>

        <FlatList
          data={STEPS}
          renderItem={renderSteps}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName="px-6 pb-6"
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}


