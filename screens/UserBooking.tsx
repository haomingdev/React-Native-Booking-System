import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { UserBookingTabNavigationProp } from './NavigationTypes';
import { getBookingIds, getBookingIdsAll, getBookingDetail, getDeleteBooking } from '../api';
import {userDefault, BookingId, Bookings} from './Types';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type UserBookingScreenProps = {
    navigation: UserBookingTabNavigationProp;
};

const UserBooking: React.FC<UserBookingScreenProps> = ({navigation}) => {

    const [bookingIds, setBookingIds] = useState<BookingId[]>([]);
    const [bookingDetails, setBookingDetails] = useState<Bookings[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [deleteData, setDeleteData] = useState("Empty");

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
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteBookingConfirmation(item.bookingid) }>
                    <Ionicons name="trash-outline" size={16} color={'white'}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('BookingDetails', { bookingid: item.bookingid })}>
                    <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
            </View>
        );
      };

    const deleteBookingConfirmation = (bookingId?: number) => {
        Alert.alert("Delete Confirmation", `Are you sure to delete this booking?`, [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
            { 
                text: "OK", 
                onPress: () => { if(bookingId) {
                    deleteBooking(bookingId);
                } 
            }}
        ],
        {cancelable: false}    
        );
    }

    const deleteBooking = async (bookingId?: number) => {
        try {
            await getDeleteBooking(bookingId!.toString());
            console.log(`BookingID ${bookingId} is deleted successfully`);
            Alert.alert("Delete Successful", `Booking ${bookingId} has been deleted successfully!`, [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]);
            // Refresh the bookings list
            const updatedBookingDetails = bookingDetails.filter(booking => booking.bookingid !== bookingId);
            setBookingDetails(updatedBookingDetails);
        } catch(error) {
            console.error(`Error deleting booking for bookingID ${bookingId}:`, error);
            Alert.alert("Delete Error", `Unable to delete booking ${bookingId}. Please try again.`, [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]);
        }
    };

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
    deleteButton: {
        backgroundColor: 'navy',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        position: 'absolute',
        alignSelf: 'flex-end',
        left: '57%',
        bottom: '7%',
    },
    image: {
        width: 125,
        height: 180,
        borderRadius: 10,
        marginRight: 5,
        flex: 0,
    },
});

export default UserBooking;
