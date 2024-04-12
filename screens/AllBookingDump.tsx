import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AllBookingsTabNavigationProp } from './NavigationTypes';
import { getBookingIdsAll, getBookingDetail } from '../api';
import {userDefault, BookingId, Bookings} from './Types';
import { useFocusEffect } from '@react-navigation/native';

type AllBookingsScreenProps = {
    navigation: AllBookingsTabNavigationProp;
};

const AllBookings: React.FC<AllBookingsScreenProps> = ({navigation}) => {

    const [bookingIds, setBookingIds] = useState<BookingId[]>([]);
    const [bookingDetails, setBookingDetails] = useState<Bookings[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchBookingDetails = async (bookingIds: BookingId[]) => {
        const detailsPromises = bookingIds.map((bookingId) =>
            getBookingDetail(bookingId.bookingid.toString())
        );
        const details = await Promise.all(detailsPromises);
        const combinedDetails = details.map((detail, index) => ({
            ...detail,
            bookingid: bookingIds[index].bookingid
        }));
        setBookingDetails(combinedDetails);
        console.log("Show Combined Detail: ", combinedDetails);
    };

    useFocusEffect(
        useCallback(() => {
            let isActive:boolean = true; 
            
            const fetchBookingIds = async () => {
                setIsLoading(true);
                try {
                    const data = await getBookingIdsAll();
                    setBookingIds(data);
                    await fetchBookingDetails(data);
                } catch (error) {
                    console.error(`Error fetching booking ids:`, error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchBookingIds();

            return () => {
                isActive = false; 
                console.log('Clean up');
              };
        }, [])
    );


  return (
    <View style={styles.container}>
      <Text>User Booking Screen</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (

        <ScrollView contentContainerStyle={styles.container}>
      {bookingDetails.map((Bookings, index) => (
        <View style={styles.card} key={index}>
          <Image source={require('../assets/premier_2_bedroom.jpg')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Waterfront Premier Suite</Text>
            <Text style={styles.cardDetail}>Check in Date: {Bookings.bookingdates.checkin}</Text>
            <Text style={styles.cardDetail}>Check out Date: {Bookings.bookingdates.checkout}</Text>
            <Text style={styles.cardDetail}>Total Price: RM{Bookings.totalprice}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
        

    )}
      <Button
            title="Go to User Profile"
            onPress={() => navigation.navigate('UserProfile')}
        />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      alignItems: 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      width: '90%',
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center', 
    },
    cardImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 10,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    cardDetail: {
      fontSize: 14,
      marginBottom: 5,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      alignSelf: 'flex-start', 
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

export default AllBookings;
