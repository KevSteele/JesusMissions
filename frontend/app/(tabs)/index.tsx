import React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import VideoPlayer from '@/components/VideoPlayer';

const landOfMartyrdomTeaserId: string = 'J53a-9dh63w';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jesus Missions</Text>
      <VideoPlayer 
        videoId={landOfMartyrdomTeaserId} 
        autoPlay={true}
        loop={false}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});