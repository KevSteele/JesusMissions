import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './FindYourMission_styles';
import MapView, { Marker, Callout } from 'react-native-maps';


const FindYourMission = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapContainer}
        initialRegion={{
          latitude: 28.0430,
          longitude: 84.0696,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker style={{flex: 1, backgroundColor: 'blue', alignItems: 'center'}}
          coordinate={{ 
            latitude: 28.0430, 
            longitude: 84.0696 }}
        >
          <Image 
            source={require('../../assets/icon.png')}
            style={{ width: 40, height: 40 }}
          />
          <Callout style={{flex: 1, position: 'relative'}}> 
            <Text>Organization: RTC</Text>
            <Text>Destination: Himalayas</Text>
            <Text>Threat Level: Midnight</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default FindYourMission;
