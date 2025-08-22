import React from 'react';
import { Text, View } from 'react-native';
import VideoPlayer from '@/components/VideoPlayer';
import { ImageBackground } from 'react-native';
import mountainBackground from '@/assets/images/mountainBackground.jpg';


const landOfMartyrdomTeaserId: string = 'J53a-9dh63w';
export default function HomeScreen() {
  return (
    <ImageBackground source={mountainBackground} className="flex-1" resizeMode="cover">
      <View className="flex-1 items-center justify-start bg-white/70 dark:bg-zinc-900/70">
        <Text className="text-2xl font-bold text-zinc-900 dark:text-white">Jesus Missions</Text>
        <VideoPlayer
          videoId={landOfMartyrdomTeaserId}
          autoPlay={true}
          loop={false}
        />
        <View className="my-8 h-px w-4/5 bg-gray-200 dark:bg-white/10" />
      </View>
    </ImageBackground>
  );
}