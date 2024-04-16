import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { AllBookingsTabNavigationProp } from './NavigationTypes';
import { getBookingIds, getBookingIdsAll, getBookingDetail } from '../api';
import {userDefault, BookingId, Bookings} from './Types';
import { useFocusEffect } from '@react-navigation/native';

type AllBookingsScreenProps = {
    navigation: AllBookingsTabNavigationProp;
};

const AllBookings: React.FC<AllBookingsScreenProps> = ({navigation}) => {

    const [bookingIds, setBookingIds] = useState<BookingId[]>([]);
    const [bookingDetails, setBookingDetails] = useState<Bookings[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const renderBookingItem = ({ item }: { item: Bookings }) => {
        return (
            <View style={styles.bookingCard}>
                <Image source={require('../assets/premier_2_bedroom.jpg')} style={styles.image} />
                <View style={styles.bookingDetail}>
                    <Text style={styles.bookingTitle} numberOfLines={1} ellipsizeMode="tail">Booking ID: {item.bookingid}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">Check-In Date: {item.bookingdates.checkin}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">Check-Out Date: {item.bookingdates.checkout}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">Total Price: {item.totalprice}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">Deposit Paid: {item.depositpaid ? 'Yes' : 'No'}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">Additional Needs: {item.additionalneeds}</Text>
                </View>
            </View>
        );
      };

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            const fetchBookingIds = async () => {
                try {
                    const data = await getBookingIdsAll();
                    if (isActive) {
                        setBookingIds(data);
                        const detailsPromises = data.map((bookingId) =>
                            getBookingDetail(bookingId.bookingid.toString())
                        );
                        const details = await Promise.all(detailsPromises);
                        const combinedDetails = details.map((detail, index) => ({
                            ...detail,
                            bookingid: data[index].bookingid
                        }));
                        setBookingDetails(combinedDetails);
                        console.log("Combined Details: ", combinedDetails)
                    }
                } catch (error) {
                    console.error(`Error fetching booking ids: `, error);
                } finally {
                    if (isActive) {
                        setIsLoading(false);
                    }
                }
            };
    
            fetchBookingIds();
            return () => {
                isActive = false;
            };
        }, [])
    );


  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (

    <FlatList
        data={bookingDetails}
        keyExtractor={(item) => item.bookingid!.toString()}
        renderItem={renderBookingItem} 
        />
    )}
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    bookingCard: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        height: 230,
        backgroundColor:'#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bookingDetail: {
        flex: 0,
        top: -15,
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detailsButton: {
        backgroundColor: 'navy',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        position: 'absolute',
        alignSelf: 'flex-end',
        left: '75%',
        bottom: '7%',
    },
    detailsButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image: {
        width: 125,
        height: 180,
        borderRadius: 10,
        marginRight: 5,
        flex: 0,
    },
});

export default AllBookings;