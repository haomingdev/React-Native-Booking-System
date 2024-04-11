import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserBookingTabNavigationProp } from './NavigationTypes';
import { getBookingIds, getBookingIdsAll, getBookingDetail } from '../api';
import {userDefault, BookingId, Bookings} from './Types';
import { useFocusEffect } from '@react-navigation/native';

type UserBookingScreenProps = {
    navigation: UserBookingTabNavigationProp;
};

const UserBooking: React.FC<UserBookingScreenProps> = ({navigation}) => {

    const [bookingIds, setBookingIds] = useState<BookingId[]>([]);
    const [bookingDetails, setBookingDetails] = useState<Bookings[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // useEffect(() => {
    //     async function fetchBookingIds() {
    //       try {
    //         const data = await getBookingIds(userDefault.firstname, userDefault.lastname);
    //         console.log(data)
    //         setBookingIds(data);
    //       } catch(error) {
    //         console.error(`Error fetching booking id for ${userDefault.firstname}:`, error);
    //       } finally {
    //         fetchBookingDetails()
    //         setIsLoading(false);
    //       }
    //     }

    //     async function fetchBookingDetails() {
    //         for(let n = 0; n<bookingIds.length; n++) {
    //             const id = bookingIds[n].bookingid;
    //             try {
    //                 const details = await getBookingDetail(id.toString());
    //                 console.log(details);
    //             } catch(error) {
    //                 console.error(`Error creating new booking:`, error);
    //             }
                
    //         }
    //     }
    
    //     fetchBookingIds();
    //   }, []);

// second try 
    //   useFocusEffect(
    //     useCallback(() => {
    //         async function fetchBookingIds() {
    //             setIsLoading(true);
    //             try {
    //                 const data = await getBookingIds(userDefault.firstname, userDefault.lastname);
    //                 setBookingIds(data);
    //                 data.forEach(async (bookingIds: { bookingid: string; }) => {
    //                     //fetch booking detail by running getBookingDetail by each id
    //                     const responseBookingDetails = await getBookingDetail(bookingIds.bookingid);
    //                     console.log(responseBookingDetails); 
    //                     setBookingDetails(responseBookingDetails);
    //                     console.log("Booking details is:", bookingDetails);
    //                 });
    //             } catch (error) {
    //                 console.error(`Error fetching booking ids for ${userDefault.firstname}:`, error);
    //             } finally {
    //                 setIsLoading(false);
    //             }
    //         }

    //         fetchBookingIds();

    //         return () => {
    //             // Optional cleanup mechanism for effects
    //             console.log('Clean up');
    //         };
    //     }, [])
    // );

//third try
    const fetchBookingDetails = async (bookingIds: BookingId[]) => {
        const detailsPromises = bookingIds.map((bookingId) =>
            getBookingDetail(bookingId.bookingid.toString())
        );
        const details = await Promise.all(detailsPromises);
        setBookingDetails(details);
        console.log("Show Detail: ", details);
    };

    useFocusEffect(
        useCallback(() => {
            const fetchBookingIds = async () => {
                setIsLoading(true);
                try {
                    const data = await getBookingIds(userDefault.firstname, userDefault.lastname);
                    setBookingIds(data);
                    await fetchBookingDetails(data);
                } catch (error) {
                    console.error(`Error fetching booking ids for ${userDefault.firstname}:`, error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchBookingIds();
        }, [])
    );

//if want to fetch all id, no filter name
    //   useEffect(() => {
    //     async function fetchBookingIdsAll() {
    //       try {
    //         const data = await getBookingIdsAll();
    //         console.log(data)
    //         setBookingIds(data);
    //       } catch(error) {
    //         console.error('Error fetching the booking id:', error);
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     }
    
    //     fetchBookingIdsAll();
    //   }, []);


  return (
    <View style={styles.container}>
      <Text>User Booking Screen</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
      <FlatList
          data={bookingIds}
            keyExtractor={(item) => item.bookingid.toString()}
            renderItem={({ item }) => <Text>Booking ID: {item.bookingid}</Text>}
        />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserBooking;
