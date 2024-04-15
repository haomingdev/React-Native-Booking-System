import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  UserBooking: undefined;
  UserProfile: undefined;
  CreateBooking: undefined;
  BookingDetails: { bookingid: number };
  AllBookings: undefined;
  UpdateBooking: {bookingid: number};
};

export type BookingDetailsParams = {
  bookingid: number;
}

export type UpdateBookingParams = {
  bookingid: number;
}

export type HomeTabNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Home'>;
export type UserBookingTabNavigationProp = BottomTabNavigationProp<RootStackParamList, 'UserBooking'>;
export type UserProfileTabNavigationProp = BottomTabNavigationProp<RootStackParamList, 'UserProfile'>;
export type CreateBookingTabNavigationProp = BottomTabNavigationProp<RootStackParamList, 'CreateBooking'>;
export type AllBookingsTabNavigationProp = BottomTabNavigationProp<RootStackParamList, 'AllBookings'>;

export type BookingDetailsStackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookingDetails'>;
export type UpdateBookingStackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpdateBooking'>;