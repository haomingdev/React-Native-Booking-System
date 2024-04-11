import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../App'; // Adjust the import path accordingly

export const screenOptions = ({ route }: BottomTabScreenProps<RootStackParamList, keyof RootStackParamList>) => ({
  tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
    let iconName: string;
    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'UserBooking') {
      iconName = focused ? 'list' : 'list-outline';
    } else if (route.name === 'UserProfile') {
      iconName = focused ? 'person' : 'person-outline';
    } else if (route.name === 'CreateBooking') {
      iconName = focused ? 'newspaper' : 'newspaper-outline';
    }else {
      iconName = 'circle';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    
  },
});
