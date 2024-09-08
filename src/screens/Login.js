import React, { useState } from 'react';
import { StyleSheet, 
    ImageBackground, 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Alert } from 'react-native';
import MainButton from '../components/MainButton';
import { useNavigation } from '@react-navigation/native';
import IconTitle from '../components/IconTitle';
import { FiLock } from "react-icons/fi";
import { MdPersonOutline } from "react-icons/md";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const loginUser = async (email, password) => {
        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        if (!isValidEmail(email)) {
            setErrorMessage('Please enter a valid email.');
            return;
        }

        try {
            const response = await fetch("http://app.engageathon.com/api/auth/login/temp/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            //console.log('Login result:', result);

            if (response.ok) {
                const { token, email, first_name, last_name } = result;
                //console.log('Login results:', result);

                const userData = {
                    token,
                    email,
                    first_name,
                    last_name,
                };
                await AsyncStorage.setItem('authToken', token);
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                navigation.navigate('ActivityScreen');
            } else {
                Alert.alert(result.message || 'Invalid login credentials. Please try again.');
            }
        } catch (error) {
            Alert.alert('An error occurred. Please check your network connection.');
        }
    };

    const handleSignUp = () => {
        navigation.navigate('UserForm');
    }
    return (

        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/backgroundImage.png")}
                style={{ width: "100%", height: "100%", position: "absolute" }}
            />
             <View style={styles.scrollContent}>
                <IconTitle />
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Login</Text>
                    <Text style={styles.subHeading}>Please login to continue</Text>

                    <View style={styles.emailContainer}>
                        <MdPersonOutline size={24} color="#ABABAB" style={styles.iconPosition} />
                        <TextInput
                            value={email}
                            onChangeText={setEmail} 
                            style={styles.enterEmail}
                            placeholder="Enter Phone or Email" 
                        />

                    </View>

                    <View style={styles.passwordContainer}>
                        <FiLock size={20} color="#ABABAB" style={styles.iconPosition}/>
                        <TextInput 
                            value={password}
                            onChangeText={setPassword}
                            //secureTextEntry
                            style={styles.enterPassword}
                            placeholder="Enter Password" 
                        />
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <MainButton title="Login" onPress={() => loginUser(email, password)} />
                    </View>

                    <View style={styles.signUpContainer}>
                        <Text style={styles.accountText}>Don't have an account? </Text>
                        <TouchableOpacity styles={styles.signUp} onPress={handleSignUp}>
                            <Text style={styles.signUpText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    ) : null}

                </View>
            </View>   
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    scrollContent: {
        height: '100vh',
        overflowY: 'scroll',
        paddingBottom: 0,
    },
    loginContainer: {
        flex: 1,
        backgroundColor: "#393939",
        height: "70%",
        paddingTop: "12%",
        paddingBottom: "7%",
        paddingHorizontal: '10%',
        marginHorizontal: "2%",
        marginTop: '30%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    loginText: {
        color: "#FF8D01",
        //fontFamily: "Poppins",
        fontSize: 45,
    },
    subHeading: {
        paddingTop: 10,
        paddingBottom: 50,
        color: "#FFFFFF",
        fontFamily: "Poppins",
        fontSize: 20,
    },
    emailContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 10,
        //padding: 20,
        marginBottom: 20,
    },
    enterEmail: {
        flex: 1,
        paddingLeft: 10,
        padding: 20,
        fontSize: 18,
        color: "#ABABAB",
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 10,
        //padding: 20,
    },
    enterPassword: {
        flex: 1,
        padding: 20,
        paddingLeft: 10,
        fontSize: 18,
        color: "#ABABAB",
    },
    iconPosition:{
        marginLeft: 20,
        marginTop: 20,
    },
    forgotPassword: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 25,
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        fontSize: 16,
        color: "#FF8D01",
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        alignSelf: 'center',
        width: '120%',
    }, 
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 80,
        justifyContent: 'center',
    },
    accountText: {
        fontSize: 16,
        color: '#ABABAB',
    },
    signUpText: {
        fontSize: 16,
        color: '#FFDE1A'
    },
    errorContainer: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 20,
    },
    errorText: {
        color: '#D8000C',
        fontSize: 16,
        textAlign: 'center',
    },

})