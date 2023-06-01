import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../App';

const NewView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is a new view!</Text>
    </View>
  );
};

export default NewView;
