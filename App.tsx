import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import UserBooking from './screens/UserBooking';
import UserProfile from './screens/UserProfile'; 
import CreateBooking from './screens/CreateBooking';
import BookingDetails from './screens/BookingDetails';
import AllBookings from './screens/AllBookings';
import { NavigationContainer } from '@react-navigation/native';
import { getAuthToken } from './api';
import { useEffect, useState } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenOptions } from './screens/tabConfigs';

export type RootStackParamList = {
  Home: undefined; 
  UserBooking: undefined;
  UserProfile: undefined;
  CreateBooking: undefined;
  BookingDetails: { bookingid: number };
  AllBookings: undefined;
};

const BookingStack = createNativeStackNavigator<RootStackParamList>();

function BookingStackNavigator() {
  return (
    <BookingStack.Navigator screenOptions={{ headerShown: false }}>
      <BookingStack.Screen name="UserBooking" component={UserBooking} />
      <BookingStack.Screen name="BookingDetails" component={BookingDetails} />
    </BookingStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }}/>
        <Tab.Screen name="UserBooking" component={BookingStackNavigator} options={{ tabBarLabel: 'Bookings' }} />
        <Tab.Screen name="UserProfile" component={UserProfile} options={{ tabBarLabel: 'Profile' }} />
        <Tab.Screen name="CreateBooking" component={CreateBooking} options={{ tabBarLabel: 'Create Booking' }} />
        <Tab.Screen name="AllBookings" component={AllBookings} options={{ tabBarLabel: 'All Booking' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
