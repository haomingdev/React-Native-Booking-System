import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Home: undefined;
  UserBooking: undefined;
  UserProfile: undefined;
  CreateBooking: undefined;
  // Define additional screens and their parameters here as needed
};

export type HomeTabNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Home'>;
export type UserBookingTabNavigationProp = BottomTabNavigationProp<RootStackParamList, 'UserBooking'>;
export type UserProfileTabNavigationProp = BottomTabNavigationProp<RootStackParamList, 'UserProfile'>;
export type CreateBookingTabNavigationProp = BottomTabNavigationProp<RootStackParamList, 'CreateBooking'>;

