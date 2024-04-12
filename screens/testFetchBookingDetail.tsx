import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, Button, ScrollView, TextInput } from 'react-native';
import { BookingDetailsTabNavigationProp, BookingDetailsStackNavigationProp, RootStackParamList  } from './NavigationTypes';
import { getBookingDetail } from '../api';
import { RouteProp } from '@react-navigation/native'
import { Bookings } from './Types';
import moment from 'moment';

type BookingDetailsScreenProps = {
    navigation: BookingDetailsStackNavigationProp;
    route: RouteProp<RootStackParamList, 'BookingDetails'>;
};

const BookingDetails: React.FC<BookingDetailsScreenProps> = ({ route, navigation}) => {
    const bookingid  = 1946;
    const[bookingDetails, setBookingDetails] = useState<Bookings>();

    useEffect(() => { 
        const fetchBookingDetails = async () => {
            try {
                const details = await getBookingDetail(bookingid.toString());
                setBookingDetails({ ...details, bookingid });
                console.log("Show Combined Detail: ", { ...details, bookingid });
            } catch(error) {
                console.error("Failed to fetch booking details:", error);
            }
        };
        fetchBookingDetails();
    }, [bookingid]);
        
    if (!bookingDetails) {
        return <Text>Loading...</Text>; 
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={require('../assets/premier_2_bedroom.jpg')} style={styles.image} />
            <Text style={styles.title}>Waterfront Premier 2-Bedroom Suite (River View)</Text>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Booking ID: </Text>
                <Text style={styles.value}>{bookingDetails.bookingid}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.value}>{bookingDetails.firstname} {bookingDetails.lastname}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Check-In Date: </Text>
                <Text style={styles.value}>{moment(bookingDetails.bookingdates.checkin).format('DD-MM-YYYY')}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Check-Out Date: </Text>
                <Text style={styles.value}>{moment(bookingDetails.bookingdates.checkout).format('DD-MM-YYYY')}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Total Price: </Text>
                <Text style={styles.value}>RM {bookingDetails.totalprice.toFixed(2)}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Deposit: </Text>
                <Text style={styles.value}>{bookingDetails.depositpaid ? "Paid" : "Unpaid"}</Text>
            </View>
            <View style={styles.additionalNeeds}>
                <Text style={styles.label}>Additional Needs:</Text>
                <TextInput 
                style={styles.input} 
                value={bookingDetails.additionalneeds}
                editable={false} 
                />
            </View>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    image: {
      width: '100%',
      height: 200, 
      resizeMode: 'cover',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: 10,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        flex: 2, // 40% width
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    value: {
        flex: 3, // 60% width
        textAlign: 'left',
    },
    additionalNeeds: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    }, 
    input: {
        flex: 1,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        textAlign: 'left',
        alignItems: 'flex-start',
        width: '95%',
        height: 61,
        marginBottom: 20,
        color: 'black',
    },
    backButton: {
        backgroundColor: '#000',
        padding: 10,
        marginTop: 15,
    },
    backButtonText: {
        color: '#fff',
        textAlign: 'center',
    }
  });

export default BookingDetails;
