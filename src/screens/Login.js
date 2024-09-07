import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import MainButton from '../components/MainButton';
import { useNavigation } from '@react-navigation/native';
import IconTitle from '../components/IconTitle';
import { FiLock } from "react-icons/fi";
import { MdPersonOutline } from "react-icons/md";

export default function WelcomeScreen () {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ActivityScreen');
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/backgroundImage.png")}
                style={{ width: "100%", height: "100%", position: "absolute" }}
            />
                <IconTitle />

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Login</Text>
                    <Text style={styles.subHeading}>Please login to continue</Text>

                    <View style={styles.emailContainer}>
                        <MdPersonOutline size={24} color="#ABABAB" />
                        <TextInput 
                            style={styles.enterEmail}
                            placeholder="Enter Phone or Email" 
                        />

                    </View>

                    <View style={styles.passwordContainer}>
                        <FiLock size={20} color="#ABABAB" />
                        <TextInput 
                            style={styles.enterPassword}
                            placeholder="Enter Password" 
                        />
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <MainButton title="Login" onPress={handlePress} />
                    </View>

                    <View style={styles.signUpContainer}>
                        <Text style={styles.accountText}>Don't have an account? </Text>
                        <TouchableOpacity styles={styles.signUp}>
                            <Text style={styles.signUpText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
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
        padding: 20,
        marginBottom: 20,
    },
    enterEmail: {
        paddingLeft: 10,
        fontSize: 18,
        color: "#ABABAB",
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 10,
        padding: 20,
    },
    enterPassword: {
        paddingLeft: 10,
        fontSize: 18,
        color: "#ABABAB",
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

})