import React from 'react';
import { Text, View } from 'react-native';
import VideoPlayer from '@/components/VideoPlayer';
import { ImageBackground } from 'react-native';
import mountainBackground from '@/assets/images/mountainBackground.jpg';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';


const landOfMartyrdomTeaserId: string = 'J53a-9dh63w';
const whatIsJesusMissionsId: string = 'VmftUo8FMkg';

export default function HomeScreen() {
  return (
    <ImageBackground source={mountainBackground} className="flex-1" resizeMode="cover">
      <View className="flex-1 items-center justify-start gap-4 p-2 bg-white/30 dark:bg-zinc-900/30">
        <Text className="w-full font-bold text-2xl py-3 text-center dark:text-white bg-white/40 dark:bg-zinc-800/40 border-gray-200 dark:border-zinc-700 border rounded-xl">
          "Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit"
        </Text>
        <View className="w-full pb-4 bg-white/40 dark:bg-zinc-800/40 border-gray-200 dark:border-zinc-700 border rounded-xl">
          <Text className="font-bold text-2xl py-3 text-center dark:text-white">
            3.2 billion people have never heard{'\n'} the Gospel of Jesus Christ.
          </Text>
          <VideoPlayer
            videoId={whatIsJesusMissionsId}
            autoPlay={true}
            loop={false}
          />
        </View>
        {/* <View className="h-px w-10/12 bg-gray-200 dark:bg-white/10" /> */}
        <View className="w-full pb-4 bg-white/40 dark:bg-zinc-800/40 border-gray-200 dark:border-zinc-700 border rounded-xl">
          <Text className="font-bold text-2xl py-3 text-center dark:text-white">
            Watch the Land of Martyrdom Trailer:
          </Text>
          <VideoPlayer
            videoId={landOfMartyrdomTeaserId}
            autoPlay={false}
            loop={false}
          />
        </View>
      </View>
    </ImageBackground>
  );
}