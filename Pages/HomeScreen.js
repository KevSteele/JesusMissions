import React from 'react';
import { View, Text, Pressable, Image, ImageBackground } from 'react-native';
import { styles } from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../Images/Home_Background.jpg')} style={styles.container}>
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <Text style={styles.homeHeaderText}>Jesus Missions.</Text>
      </View>
      <View style={styles.homeBodyContainer}>
        <Image source={require('../Images/JesusMission-white.png')} styles={styles.container}></Image>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('GoOnMissions')}>
            <Text style={styles.buttonText}>Find Your Mission</Text>
          </Pressable>
          {/* <Pressable style={styles.button} onPress={() => navigation.navigate('SetUpMissions')}>
            <Text style={styles.buttonText}>Set up a missions trip</Text>
          </Pressable> */}
        </View>
      </View>
      {/* <View style={styles.signon_signin_Container}>
        <Pressable onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.pressableText}>Sign-In</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.pressableText}>Sign-Up</Text>
        </Pressable>
      </View> */}
    </View>
    </ImageBackground>
  );
};

export default HomeScreen;
