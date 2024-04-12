import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
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
            <Text style={styles.textlabel}>Welcome to GM Hotel!</Text>
            <Text style={styles.textlabel}>(Logged in as Sally Brown)</Text>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfile')}>
                <Text style={styles.buttonText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserBooking')}>
                <Text style={styles.buttonText}>View My Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateBooking')}>
                <Text style={styles.buttonText}>Create New Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AllBookings')}>
                <Text style={styles.buttonText}>View All Booking</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
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
  textlabel: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    elevation: 8,
    backgroundColor: 'navy',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    width: '50%',
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default HomeScreen;
