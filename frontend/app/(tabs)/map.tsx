import React from 'react';
import { Text, View } from 'react-native';

export default function UnreachedScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-zinc-900">
      <Text className="text-xl font-bold text-black dark:text-white">Unreached</Text>
      <View className="my-8 h-px w-4/5 bg-gray-200 dark:bg-white/10" />
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
    </View>
  );
}


