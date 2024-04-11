import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getAuthToken } from '../api';
import { useEffect, useState } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
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
            {/*Show Auth Token. Remove after dev.*/}
            <Text>Auth Token: {authToken ? authToken : 'No token'}</Text>
            {/*Show User First Name and Last Name*/}
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
