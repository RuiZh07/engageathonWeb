import React, { useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const images = [
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
    };

    return (
        <View style={styles.mainBackgroundColor}>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Image source={images[currentIndex]} style={styles.card} resizeMode="cover" />
                </View>

                <View style={styles.indicator}>
                    {images.map((_, index) => (
                        <View 
                            key={index} 
                            style={[
                                styles.dot, 
                                currentIndex === index ? styles.activeDot : styles.inactiveDot
                            ]}
                        />
                    ))}
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
        bottom: 80,
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
    inactiveDot: {
        backgroundColor: "#fff", 
    },
    activeDot: {
        backgroundColor: "#FF8D00",
    },
    buttonContainer: {
        bottom: 60,
        postition: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 25,
    },
    skipButton: {

    },
    skipButtonText: {
        fontFamily: 'Poppins',
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 400,
    },
    getStartedButton: {
        position: 'absolute',
        right: 20,
        bottom: -20,
    },
    getStartedButtonText: {
        fontFamily: 'Poppins',
        color: "#FF8D00",
        fontSize: 20,
        fontWeight: 400,
    },
    nextButton: {
    },
    nextButtonText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 400,
        color: "#FFFFFF",
    }
});