import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FindYourMission from './Pages/FindYourMission/FindYourMission';
import SetUpMissions from './Pages/SetUpMissions';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import HomeScreen from './Pages/HomeScreen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {backgroundColor: '#1b1b1b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontSize: 20, fontWeight: 'bold', color: '#ffffff'},
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name='FindYourMission' component={FindYourMission} options={{ title: 'Find Your Mission.' }}/>
        {/* <Stack.Screen name="SetUpMissions" component={SetUpMissions} options={{ title: 'Set up a Missions Trip' }} /> */}
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Create an Account' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}