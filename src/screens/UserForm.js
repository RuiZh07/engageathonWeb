import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, TextInput } from 'react-native';
import MainButton from '../components/MainButton';
import IconTitle from '../components/IconTitle';
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SvgUri } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';

export default function UserForm() {
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('ActivityScreen');
    }
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
                            <TextInput
                                style={styles.userInput}
                                placeholder="First Name"
                                placeholderTextColor='#CBCBCB'
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
                            <TextInput
                                style={styles.userInput}
                                placeholder="Last Name"
                                placeholderTextColor='#CBCBCB'
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
                            {/*<Ionicons name="person-outline" size={24} color="#ABABAB" style={{ marginLeft: 24}}/>*/}
                            <TextInput
                                style={styles.userInput}
                                placeholder="Email"
                                placeholderTextColor='#CBCBCB'
                            />
                        </View>
                    </LinearGradient>

                </View>

                <View style={styles.buttonContainer}>
                    <MainButton title="Continue" onPress={handleContinue} />
                </View>
                
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
        paddingLeft: 24,
        paddingVertical: 18,
        fontSize: 16,
        color: '#CBCBCB',
    },
    emailInput: {
        flex: 1,
        paddingLeft: 10,
        paddingVertical: 18,
        fontSize: 16,
        color: '#CBCBCB',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 150,
    }, 
})