import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../App';
import MapView from 'react-native-maps';

const FindYourMission = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Find Your Mission</Text>
      <MapView
        style={{ flex: 1, backgroundColor: "blue" }}
        initialRegion={{
          latitude: 28.0000,
          longitude: 82.0000,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default FindYourMission;
