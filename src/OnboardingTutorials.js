import React, { useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Dimensions,
    Image,
    TouchableOpacity,
    Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const images = [
    require("../assets/splashScreens/onboarding.png"),
    require("../assets/splashScreens/onboarding_1.png"),
    require("../assets/splashScreens/onboarding_2.png"),
    require("../assets/splashScreens/onboarding_3.png"),
    require("../assets/splashScreens/onboarding_4.png"),
    require("../assets/splashScreens/onboarding_5.png"),
];

export default function ImageSlider() {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleGetStartedButton = () => {
        navigation.navigate('Login');
    };
    
    const handleNextPress = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            handleGetStartedButton();
        }
    }

    console.log("Current Index: ", currentIndex);

    return (
        <View style={styles.mainBackgroundColor}>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Image source={images[currentIndex]} style={styles.card} resizeMode="cover" />
                </View>

                <View style={styles.buttonContainer}>
                    {currentIndex < images.length - 1 && (
                        <TouchableOpacity style={styles.skipButton} onPress={handleGetStartedButton}>
                            <Text style={styles.skipButtonText}>Skip</Text>
                        </TouchableOpacity>
                    )}
                    
                    {currentIndex < images.length - 1 ? (
                        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStartedButton}>
                            <Text style={styles.getStartedButtonText}>Let's Begin</Text>
                        </TouchableOpacity>
                    )}
                </View>
                    {/*
                <View style={styles.indicator}>
                    {images.map((_, index) => (
                        <view key={index} style={[styles.dot, currentIndex == index && styles.activeDot]} />
                    ))}
                </View>

                */}
                
                
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    mainBackgroundColor: {
        backgroundColor: "#1f1f1e",
        flex: 1,
    },
    container: {
        flex: 1,
    },
    cardContainer: {
        width: '100%',
        height: '100%',
    },
    card: {
        width: '100%',
        height: '100%',
    },
    indicator: {
        flexDirection: "row",
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
    },
    dot: {
        height: 10,
        width: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginHorizontal: 5,
        //overflow: "hidden",
    },
    activeDot: {
        height: 10,
        width: 10,
        backgroundColor: "#2BAB47",
        position: "absolute",
    },
    buttonContainer: {
        bottom: 40,
        postition: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    skipButton: {

    },
    skipButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "400",
    },
    getStartedButton: {
        //alignItems: "center",
        //justifyContent: "flex-end",
       // width: 107,
        //height: 28,
       // borderRadius: 30,
       alignSelf: 'flex-end',
    },
    getStartedButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "400",
    },
    nextButton: {
    },
    nextButtonText: {
        fontSize: 18,
        fontWeight: "400",
        color: "#FFFFFF",
    }
});