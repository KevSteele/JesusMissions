import React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from 'react-native';
import VideoPlayer from '@/components/VideoPlayer';

const landOfMartyrdomTeaserId: string = 'J53a-9dh63w';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-zinc-900">
      <Text className="text-xl font-bold text-black dark:text-white">Jesus Missions</Text>
      <VideoPlayer 
        videoId={landOfMartyrdomTeaserId} 
        autoPlay={true}
        loop={false}
      />
      <View className="my-8 h-px w-4/5 bg-gray-200 dark:bg-white/10" />
    </View>
  );
}
