import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CreateBookingTabNavigationProp } from './NavigationTypes';
import moment from 'moment';
import { Bookings } from './Types';
import { createBooking } from '../api';
import Ionicons from 'react-native-vector-icons/Ionicons';


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

  const handleBooking = async () => {
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
        <Text style={styles.label}>First Name:</Text>
        <TextInput value={firstName} onChangeText={setFirstName} style={styles.input} multiline= {false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput value={lastName} onChangeText={setLastName} style={styles.input} multiline= {false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Check In Date: {moment(checkInDate).format('DD MMMM YYYY')}</Text>
        <TouchableOpacity style={styles.buttonDatePicker} onPress={showCheckInPicker}>
            <Text style={styles.buttonText}><Ionicons name="calendar" size={16} color="#fff" />   {("Select Check-In Date" )}</Text>
        </TouchableOpacity>
        {checkInPickerShow && ( 
            <DateTimePicker
                style={styles.dateTimePicker}
                value={checkInDate}
                display="default"
                mode="date"
                onChange={(event, selectedDate) => {
                    setCheckInPickerShow(false);
                    const currentDate = selectedDate || checkInDate;
                    setCheckInDate(moment(currentDate).startOf('day').toDate());
                }}
            />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Check Out Date: {moment(checkOutDate).format('DD MMMM YYYY')}</Text>
        <TouchableOpacity style={styles.buttonDatePicker} onPress={showCheckOutPicker}>
            <Text style={styles.buttonText}><Ionicons name="calendar" size={16} color="#fff" />   {("Select Check-Out Date" )}</Text>
        </TouchableOpacity>
        {checkOutPickerShow && ( 
            <DateTimePicker
            style={styles.dateTimePicker}
            value={checkOutDate}
            display="default"
            mode="date"
            onChange={(event, selectedDate) => {
                setCheckOutPickerShow(false);
                const currentDate = selectedDate || checkOutDate;
                setCheckOutDate(moment(currentDate).startOf('day').toDate());
            }}
            />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price per Night: RM 400.00</Text>
        <Text style={styles.label}>Total Price: RM {totalPrice.toFixed(2)}</Text>
        <Text style={styles.label}>Additional Needs: </Text>
        <TextInput value={additionalNeeds} onChangeText={setAdditionalNeeds} style={styles.textInput} multiline= {true}></TextInput>
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
    height: 250, 
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
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
  buttonDatePicker: {
    elevation: 8,
    backgroundColor: 'navy',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 0,
    width: '80%',
    left: '10%',
  },
  button: {
    elevation: 8,
    backgroundColor: 'navy',
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
