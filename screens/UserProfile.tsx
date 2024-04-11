import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserProfileTabNavigationProp } from './NavigationTypes';
import {User, userDefault} from './Types';

type UserProfileScreenProps = {
    navigation: UserProfileTabNavigationProp;
};

const UserProfile: React.FC<UserProfileScreenProps> = ({navigation}) => {
    const [firstName, setFirstName] = useState(userDefault.firstname);
    const [lastName, setLastName] = useState(userDefault.lastname);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>User Profile Page</Text>
            <View style={styles.profileCard}>
                <Text style={styles.profileHeader}>My Profile</Text>
                
                <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setFirstName}
                    value={firstName}
                    placeholder="First Name"
                    editable={false}
                />
                </View>

                <View style={styles.inputGroup}>
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setLastName}
                    value={lastName}
                    placeholder="Last Name"
                    editable={false}
                />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    profileCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'blue', // Adjust border color as needed
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#FFFFFF', // Adjust background color as needed
        color: 'black',
    },
});

export default UserProfile;
