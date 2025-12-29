import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ImageBackground } from 'react-native';
import mountainBackground from '@/assets/images/mountainBackground.jpg';
import { useRouter } from 'expo-router';
import VideoPlayer from '@/components/VideoPlayer';


const LAND_OF_MARTYRDOM_VIDEO_ID = 'J53a-9dh63w';
const WHAT_IS_JESUS_MISSIONS_VIDEO_ID = 'VmftUo8FMkg';

export default function HomeScreen() {
  const router = useRouter();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  
  return (
    <ImageBackground source={mountainBackground} className="flex-1" resizeMode="cover">
      <ScrollView className="flex-1">
        <View className="flex-1 items-center bg-gradient-to-b from-black/60 to-black/40">
          {/* Hero Section */}
          <View className="w-full px-6 pt-16 pb-12 items-center">
            <Text className="text-4xl font-bold text-white text-center mb-4">
              The Mission of Jesus{'\n'}Is Not Finished
            </Text>
            <Text className="text-6xl font-bold text-white mb-2">3.2B</Text>
            <Text className="text-xl text-white/90 text-center mb-8">
              people still haven't heard{'\n'}the Gospel
            </Text>
            <TouchableOpacity 
              className="bg-white px-8 py-4 rounded-full"
              onPress={() => router.push('/steps')}
            >
              <Text className="text-black font-bold text-lg">Start a Mission</Text>
            </TouchableOpacity>
          </View>

          {/* Video Cards Section */}
          <View className="w-full px-6 pb-8 gap-6">
            {/* Featured Video 1 */}
            <View className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden">
              {activeVideoId === WHAT_IS_JESUS_MISSIONS_VIDEO_ID ? (
                <>
                  <View className="py-3">
                    <VideoPlayer
                      videoId={WHAT_IS_JESUS_MISSIONS_VIDEO_ID}
                      loop={false}
                    />
                  </View>
                  <View className="p-4">
                    <Text className="text-xl font-bold text-black dark:text-white mb-2">
                      What is Jesus Missions?
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-400">
                      Discover how you can be part of reaching the unreached
                    </Text>
                    <View className="flex-row items-center mt-3">
                      <Text className="text-blue-600 dark:text-blue-400 font-semibold">▶ Watch</Text>
                    </View>
                  </View>
                </>
              ) : (
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={() => setActiveVideoId(WHAT_IS_JESUS_MISSIONS_VIDEO_ID)}
                >
                  <View className="py-3">
                    <View className="px-4">
                      <View className="w-full aspect-[16/9]">
                        <Image 
                          source={{ uri: `https://img.youtube.com/vi/${WHAT_IS_JESUS_MISSIONS_VIDEO_ID}/maxresdefault.jpg` }}
                          className="w-full h-full rounded-lg"
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                  </View>
                  <View className="p-4">
                    <Text className="text-xl font-bold text-black dark:text-white mb-2">
                      What is Jesus Missions?
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-400">
                      Discover how you can be part of reaching the unreached
                    </Text>
                    <View className="flex-row items-center mt-3">
                      <Text className="text-blue-600 dark:text-blue-400 font-semibold">▶ Watch</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* Featured Video 2 */}
            <View className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden">
              {activeVideoId === LAND_OF_MARTYRDOM_VIDEO_ID ? (
                <>
                  <View className="py-3">
                    <VideoPlayer
                      videoId={LAND_OF_MARTYRDOM_VIDEO_ID}
                      loop={false}
                    />
                  </View>
                  <View className="p-4">
                    <Text className="text-xl font-bold text-black dark:text-white mb-2">
                      Land of Martyrdom
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-400">
                      A story of faith under fire
                    </Text>
                    <View className="flex-row items-center mt-3">
                      <Text className="text-blue-600 dark:text-blue-400 font-semibold">▶ Watch</Text>
                    </View>
                  </View>
                </>
              ) : (
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={() => setActiveVideoId(LAND_OF_MARTYRDOM_VIDEO_ID)}
                >
                  <View className="py-3">
                    <View className="px-4">
                      <View className="w-full aspect-[16/9]">
                        <Image 
                          source={{ uri: `https://img.youtube.com/vi/${LAND_OF_MARTYRDOM_VIDEO_ID}/maxresdefault.jpg` }}
                          className="w-full h-full rounded-lg"
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                  </View>
                  <View className="p-4">
                    <Text className="text-xl font-bold text-black dark:text-white mb-2">
                      Land of Martyrdom
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-400">
                      A story of faith under fire
                    </Text>
                    <View className="flex-row items-center mt-3">
                      <Text className="text-blue-600 dark:text-blue-400 font-semibold">▶ Watch</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* Impact Card */}
            <View className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-6">
              <Text className="text-white text-3xl font-bold mb-2">3.2B Unreached</Text>
              <Text className="text-white/90 text-lg mb-6">
                People without access to the Gospel
              </Text>
              <View className="flex-row gap-3">
                <TouchableOpacity 
                  className="flex-1 bg-white px-4 py-3 rounded-lg"
                  onPress={() => router.push('/(tabs)/unreached')}
                >
                  <Text className="text-blue-600 font-semibold text-center">See Where</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="flex-1 bg-white/20 px-4 py-3 rounded-lg border border-white/40"
                  onPress={() => router.push('/steps')}
                >
                  <Text className="text-white font-semibold text-center">How to Help</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}