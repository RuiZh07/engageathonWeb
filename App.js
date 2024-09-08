import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ImageSlider from './src/OnboardingTutorials';
import WelcomeScreen from './src/screens/WelcomeScreen';
import UserForm from './src/screens/UserForm';
import ActivityScreen from './src/screens/ActivityScreen';
import Login from "./src/screens/Login";
import CongratsScreen from './src/screens/CongratsScreen';
import CollectRewardsScreen from './src/screens/CollectRewardsScreen';
import CameraComponent from './src/components/CameraComponent';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="ImageSlider" component={ImageSlider} options={{ headerShown: false }}/>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UserForm" component={UserForm} options={{ headerShown: false }}/>
        <Stack.Screen name="ActivityScreen" component={ActivityScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="CongratsScreen" component={CongratsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CollectRewardsScreen" component={CollectRewardsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CameraComponent" component={CameraComponent} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
