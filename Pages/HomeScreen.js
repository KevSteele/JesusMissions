import React from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';
// import { styles } from '../App';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Jesus Missions!</Text>
      <Button style={styles.button}
        title="Go on a missions trip"
        onPress={() => navigation.navigate('NewView')}
      />
      <Button style={styles.button}
        title="Set up a missions trip"
        onPress={() => navigation.navigate('NewView')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#00f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


