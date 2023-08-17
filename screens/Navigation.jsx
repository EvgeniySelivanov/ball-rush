import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BallRust from './BallRust';
import { StartScreen } from './StartScreen';
import WebViewScreen from './WebViewScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={StartScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="WebViewScreen" component={WebViewScreen}/>
      <Stack.Screen name="BallRust" component={BallRust}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
};