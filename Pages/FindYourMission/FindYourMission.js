import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './FindYourMission_styles';
import MapView from 'react-native-maps';

const FindYourMission = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapContainer}
        initialRegion={{
          latitude: 28.3949,
          longitude: 82.1240,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default FindYourMission;
