import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import MatchScreen from './src/screens/MatchScreen';

export type RootStackParamList = {
  Marketplace: undefined;
  Match: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
