import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import MatchScreen from './src/screens/MatchScreen';
import ChatScreen from './src/screens/Chat';
import ChatListScreen from './src/screens/ChatListScreen';
import { ImageSourcePropType } from 'react-native';

export type RootStackParamList = {
  Marketplace: undefined;
  Match: undefined;
  ChatList: undefined;
  Chat: { name: string; avatar: ImageSourcePropType };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  