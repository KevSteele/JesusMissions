import React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function kappaImpactScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-zinc-900">
      <View className="w-full h-[400px] flex-1">
        <WebView
          source={{ uri: 'https://www.kappaimpact.com/projects/the-great-commission' }}
        />
      </View>
    </View>
  );
}


