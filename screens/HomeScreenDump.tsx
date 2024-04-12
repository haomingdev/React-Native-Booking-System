import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { getAuthToken } from '../api';
import { useEffect, useState } from 'react';
import {User, Bookings} from './Types';
import {HomeTabNavigationProp } from './NavigationTypes';

type HomeScreenProps = {
    navigation: HomeTabNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

    const [authToken, setAuthToken] = useState(null);

    const user: User = {
      firstname: "haoming",
      lastname: "dev",
    }

    useEffect(() => {
        async function fetchToken() {
          try {
            const token = await getAuthToken();
            setAuthToken(token);
          } catch(error) {
            console.error('Error fetching the auth token:', error);
          }
        }
    
        fetchToken();
      }, []);

    return (
        <View style={styles.container}>
            <Text>Hello Home Screen!</Text>
            <Text>Auth Token: {authToken ? authToken : 'No token'}</Text>
            <Text>User: {user.firstname} {user.lastname}</Text>
            <StatusBar style="auto" />

            <Button
            title="Go to User Bookings"
            onPress={() => navigation.navigate('UserBooking')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
