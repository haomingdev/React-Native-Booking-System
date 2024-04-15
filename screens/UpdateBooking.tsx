import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, Button, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { UpdateBookingStackNavigationProp, RootStackParamList } from './NavigationTypes';
import { getBookingDetail, putUpdateBooking } from '../api';
import { RouteProp } from '@react-navigation/native'
import { Bookings } from './Types';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

type UpdateBookingScreenProps = {
    navigation: UpdateBookingStackNavigationProp;
    route: RouteProp<RootStackParamList, 'UpdateBooking'>;
};

const UpdateBooking: React.FC<UpdateBookingScreenProps> = ({ route, navigation}) => {
    const { bookingid } = route.params;
    const[bookingDetails, setBookingDetails] = useState<Bookings>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [additionalNeeds, setAdditionalNeeds] = useState('');
    const [checkInPickerShow, setCheckInPickerShow] = useState(false);
    const [checkOutPickerShow, setCheckOutPickerShow] = useState(false);
    const [totalNight, setTotalNight] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0.00);
    const [depositPaid, setDepositPaid] = useState<boolean>();

    const updateBookingConfirmation = () => {
        Alert.alert("Update Confirmation", `Are you sure to update this booking?`, [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
            { 
                text: "Yes", 
                onPress: () => { if(bookingid) {
                    updateBooking();
                } 
            }}
        ],
        {cancelable: false}    
        );
    }

    const updateBooking = async () => {
        const updateBooking: Bookings = {
            firstname: "Sally",
            lastname: "Brown",
            totalprice: totalPrice,
            bookingdates: {
                checkin: moment(checkInDate).format('DD MMMM YYYY'),
                checkout: moment(checkOutDate).format('DD MMMM YYYY')
            },
            depositpaid: false,
            additionalneeds: additionalNeeds,
        }
        try {
            const data = await putUpdateBooking(bookingid!.toString(), updateBooking);
            if(data) {
                console.log("Returned data:", data);
                Alert.alert("Update Successful", `Your booking ${bookingid.toString()} has been successfully update!`, [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]);
            }
        } catch(error) {
            console.error(`Error updating booking ${bookingid.toString()}:`, error);
            Alert.alert("Update Failed", `Failed to update booking ${bookingid.toString()}. Please try again later.`, [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]);
        }
    };

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

    useEffect(() => {
        if (bookingDetails) {
          setFirstName(bookingDetails.firstname);
          setLastName(bookingDetails.lastname);
          setCheckInDate(bookingDetails.bookingdates.checkin);
          setCheckOutDate(bookingDetails.bookingdates.checkout);
          setAdditionalNeeds(bookingDetails.additionalneeds);
          setTotalPrice(bookingDetails.totalprice);
          setDepositPaid(bookingDetails.depositpaid);
        }
      }, [bookingDetails]);
        
    if (!bookingDetails) {
        return <Text>Loading...</Text>;  
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={require('../assets/premier_2_bedroom.jpg')} style={styles.image} />
            <Text style={styles.title}>Waterfront Premier 2-Bedroom Suite (River View)</Text>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Booking ID: </Text>
                <Text style={styles.value}>{bookingid.toString()}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.value}>{firstName} {lastName}</Text>
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
                <Text style={styles.value}>RM {totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Deposit: </Text>
                <Text style={styles.value}>{depositPaid ? "Paid" : "Unpaid"}</Text>
            </View>
            <View style={styles.additionalNeeds}>
                <Text style={styles.label}>Additional Needs:</Text>
                <TextInput 
                    style={styles.input} 
                    value={additionalNeeds}
                    editable={true} 
                    onChangeText={setAdditionalNeeds}
                />
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={() => updateBookingConfirmation() }>
                <Ionicons name="save-outline" size={16} color={'white'}><Text style={styles.buttonText}>   Save Changes</Text></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={16} color={'white'}><Text style={styles.buttonText}>   Back</Text></Ionicons>
            </TouchableOpacity>
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
    }, 
    updateButton: {
        elevation: 8,
        backgroundColor: 'navy',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 5,
        alignSelf: 'flex-start',
        width: '46%',
        left: '8%',
        bottom: '0%',
        zIndex: 1,
    },
    button: {
        flexDirection: 'row',
        elevation: 8,
        backgroundColor: 'navy',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 5,
        width: '33%',
        alignSelf: 'flex-end',
        right: '4%',
        bottom: '12%',
      },
      buttonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
  });

export default UpdateBooking;
