import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, TextInput, Alert } from 'react-native';
import MainButton from '../components/MainButton';
import IconTitle from '../components/IconTitle';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { MdMailOutline } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleContinue = async () => {
        if (!firstName || !lastName || !email) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (!isValidEmail(email)) {
            setErrorMessage('Please enter a valid email.');
            return;
        }

        try {
            const response = await fetch("http://app.engageathon.com/api/auth/privateregiser/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                const userData = {
                    token: result.token,
                    email: result.email,
                    first_name: result.first_name,
                    last_name: result.last_name,
                };

                await AsyncStorage.setItem('userData', JSON.stringify(userData));

                console.log('Sign up successful:', result);
                navigation.navigate('ActivityScreen');

            } else {
                Alert.alert('Error', result.message || 'Failed to register. Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please check your network connection.');
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/backgroundImage.png")}
                style={{ width: "100%", height: "100%", position: "absolute" }}
            />
                <IconTitle />

                <View style={styles.enterTextContainer}>
                    <Text style={styles.enterText}>Enter your name and email below to get started!</Text>
                </View>

                <View style={styles.inputContainer}>
                <LinearGradient
                    colors={['rgba(255, 141, 0, 0.3)', 'rgba(255, 222, 26, 0.3)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBackground}
                >
                    <View style={styles.userInputContainer}>
                        <MdOutlinePersonOutline size={30} color="#CBCBCB" style={styles.iconPosition} />
                        <TextInput
                            style={styles.userInput}
                            placeholder="First Name"
                            placeholderTextColor='#CBCBCB'
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={['rgba(255, 141, 0, 0.3)', 'rgba(255, 222, 26, 0.3)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBackground}
                >
                    <View style={styles.userInputContainer}>
                        <MdOutlinePersonOutline size={30} color="#CBCBCB" style={styles.iconPosition} />
                        <TextInput
                            style={styles.userInput}
                            placeholder="Last Name"
                            placeholderTextColor='#CBCBCB'
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={['rgba(255, 141, 0, 0.3)', 'rgba(255, 222, 26, 0.3)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBackground}
                >
                    <View style={styles.userInputContainer}>                       
                        <MdMailOutline size={30} color="#CBCBCB" style={styles.iconPosition} />
                        <TextInput
                            style={styles.userInput}
                            placeholder="Email"
                            placeholderTextColor='#CBCBCB'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </LinearGradient>
            </View>

            <View style={styles.buttonContainer}>
                <MainButton title="Continue" onPress={handleContinue} />
            </View>

            {errorMessage ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    enterTextContainer: {
        justifyContent: "center",
        flexDirection: "column",
        marginHorizontal: 30,
        marginTop: 40,
        //marginBottom: 220,
    },
    enterText: {
        color: "#FFFFFF",
        fontWeight: 600,
        fontSize: 24,
        lineHeight: 34.09,
    },
    inputContainer: {
        marginTop: 20,
        marginHorizontal: 30,
    },
    gradientBackground: {
        borderRadius: 14,
        marginBottom: 20,
    },
    userInputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#848484',
    },
    userInput: {
        flex: 1,
        paddingLeft: 10,
        paddingVertical: 18,
        fontSize: 20,
        color: '#CBCBCB',
    },
    iconPosition:{
        marginLeft: 20,
    },
    buttonContainer: {
        marginTop: 100,
    }, 
    errorContainer: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 30,
        marginHorizontal: 20,
    },
    errorText: {
        color: '#D8000C',
        fontSize: 16,
        textAlign: 'center',
    },
})