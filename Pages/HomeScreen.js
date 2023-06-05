import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.jesus}>JESUS</Text>
        <Text style={styles.missions}>MISSIONS</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('GoOnMissions')}>
          <Text style={styles.buttonText}>Find Your Mission</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('SetUpMissions')}>
          <Text style={styles.buttonText}>Set up a missions trip</Text>
        </Pressable>
      </View>
      <View style={styles.signon_signin_Container}>
        <Pressable onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.pressableText}>Sign-In</Text>
        </Pressable>
        <Text style={{color: '#0000FF'}}>/</Text>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.pressableText}>Sign-Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
