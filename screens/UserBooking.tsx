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

//third try
    const fetchBookingDetails = async (bookingIds: BookingId[]) => {
        const detailsPromises = bookingIds.map((bookingId) =>
            getBookingDetail(bookingId.bookingid.toString())
        );
        const details = await Promise.all(detailsPromises);
        //setBookingDetails(details);
        //console.log("Show Detail: ", details);
        const combinedDetails = details.map((detail, index) => ({
            ...detail,
            bookingid: bookingIds[index].bookingid
        }));
        setBookingDetails(combinedDetails);
        console.log("Show Combined Detail: ", combinedDetails);
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


  return (
    <View style={styles.container}>
      <Text>User Booking Screen</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
    //   <FlatList
    //       data={bookingIds}
    //         keyExtractor={(item) => item.bookingid.toString()}
    //         renderItem={({ item }) => <Text>Booking ID: {item.bookingid}</Text>}
    //     />
    <FlatList
    data={bookingDetails}
    keyExtractor={(item) => item.bookingid!.toString()}
    renderItem={({ item }) => (
        <View>
            <Text>Booking ID: {item.bookingid}</Text>
            <Text>Name: {item.firstname} {item.lastname}</Text>
            <Text >Check-In Date: {item.bookingdates.checkin}</Text>
            <Text>Check-Out Date: {item.bookingdates.checkout}</Text>
            <Text>Total Price: {item.totalprice}</Text>
            <Text>Deposit Paid: {item.depositpaid ? 'Yes' : 'No'}</Text>
            <Text>Additional Needs: {item.additionalneeds}</Text>
        </View>
    )}
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
