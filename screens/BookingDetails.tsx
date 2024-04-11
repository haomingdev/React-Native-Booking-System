import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from 'react-native';
import { BookingDetailsTabNavigationProp, RootStackParamList  } from './NavigationTypes';
import { RouteProp } from '@react-navigation/native'

type BookingDetailsScreenProps = {
    navigation: BookingDetailsTabNavigationProp;
    route: RouteProp<RootStackParamList, 'BookingDetails'>;
};

const BookingDetails: React.FC<BookingDetailsScreenProps> = ({ route, navigation}) => {
    const { bookingid } = route.params;
    return (
        <View style={styles.container}>
            <Text>Hello Booking Details Screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
});

export default BookingDetails;
