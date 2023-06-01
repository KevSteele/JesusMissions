// HomeScreen.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Jesus Missions!</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('NewView')}>
          <Text style={styles.buttonText}>Go on a missions trip</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('NewView')}>
          <Text style={styles.buttonText}>Set up a missions trip</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
