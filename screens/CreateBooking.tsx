import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CreateBookingTabNavigationProp } from './NavigationTypes';
import moment from 'moment';
import { Bookings } from './Types';
import { createBooking } from '../api';


type CreateBookingScreenProps = {
    navigation: CreateBookingTabNavigationProp;
};
const fullWidth = Dimensions.get('window').width;

const CreateBooking: React.FC<CreateBookingScreenProps> = ({navigation}) => {
   
  const [firstName, setFirstName] = useState('Sally');
  const [lastName, setLastName] = useState('Brown');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [additionalNeeds, setAdditionalNeeds] = useState('');
  const [checkInPickerShow, setCheckInPickerShow] = useState(false);
  const [checkOutPickerShow, setCheckOutPickerShow] = useState(false);
  const [totalNight, setTotalNight] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0.00);

  // Add the logic to handle booking submission
  const handleBooking = async () => {
    // Implement booking logic
    const newBooking: Bookings = {
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
        const data = await createBooking(newBooking);
        if(data) {
            console.log(data);
            Alert.alert("Booking Successful", "Your booking has been successfully created!", [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]);
        }
      } catch(error) {
        console.error(`Error creating new booking:`, error);
        Alert.alert("Booking Failed", "Failed to create booking. Please try again later.", [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]);
      }
  };

  const showCheckInPicker = () => {
    setCheckInPickerShow(true);
  }

  const showCheckOutPicker = () => {
    setCheckOutPickerShow(true);
  }

  useEffect(() => {
    const startDate = moment(checkInDate).startOf('day');
    const endDate = moment(checkOutDate).startOf('day');
    const diffDays = endDate.diff(startDate, 'days');
    setTotalNight(diffDays >= 0 ? diffDays : 1);  
    setTotalPrice(((diffDays)*400));
}, [checkInDate, checkOutDate]);  


  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/premier_2_bedroom.jpg')} style={styles.image} />
      <Text style={styles.title}>Waterfront Premier 2-Bedroom Suite (River View)</Text>
      <View style={styles.inputContainer}>
        <Text>First Name:</Text>
        <TextInput value={firstName} onChangeText={setFirstName} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Last Name:</Text>
        <TextInput value={lastName} onChangeText={setLastName} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={showCheckInPicker}>
            <Text style={styles.buttonText}>Select Check-In Date</Text>
        </TouchableOpacity>
        <Text>Check In Date: {moment(checkInDate).format('DD MMMM YYYY')}</Text>
        {checkInPickerShow && ( 
            <DateTimePicker
                style={styles.dateTimePicker}
                value={checkInDate}
                display="default"
                mode="date"
                onChange={(event, selectedDate) => {
                    setCheckInPickerShow(false);
                    const currentDate = selectedDate || checkInDate;
                    //setCheckInDate(currentDate);
                    setCheckInDate(moment(currentDate).startOf('day').toDate());
                }}
            />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={showCheckOutPicker}>
            <Text style={styles.buttonText}>Select Check-Out Date</Text>
        </TouchableOpacity>
        <Text>Check Out Date: {moment(checkOutDate).format('DD MMMM YYYY')}</Text>
        {checkOutPickerShow && ( 
            <DateTimePicker
            style={styles.dateTimePicker}
            value={checkOutDate}
            display="default"
            mode="date"
            onChange={(event, selectedDate) => {
                setCheckOutPickerShow(false);
                const currentDate = selectedDate || checkOutDate;
                //setCheckOutDate(currentDate);
                setCheckOutDate(moment(currentDate).startOf('day').toDate());
            }}
            />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text>Price per Night: RM 400.00</Text>
        <Text>Total Price: RM {totalPrice.toFixed(2)}</Text>
        <Text>Additional Needs: </Text>
        <TextInput value={additionalNeeds} onChangeText={setAdditionalNeeds} style={styles.textInput}></TextInput>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250, // Adjust height to your requirement
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
  },
  dateTimePicker: {
    width: fullWidth,
  },
  textInput: {
    borderWidth: 1,
    height: 80,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  button: {
    elevation: 8,
    backgroundColor: "#808000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default CreateBooking;
