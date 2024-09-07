import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text } from 'react-native';
import MainButton from '../components/MainButton';
import { useNavigation } from '@react-navigation/native';
import IconTitle from '../components/IconTitle';
export default function WelcomeScreen () {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ImageSlider');
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/backgroundImage.png")}
                style={{ width: "100%", height: "100%", position: "absolute" }}
            />
                <IconTitle />

                <View style={styles.welcomeTextContainer}>
                    <Text style={styles.welcomeText}>Let's Begin to{"\n"}Engage!</Text>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.desText}>Earn Points , Get Badges .</Text>
                        <Text style={styles.rewardsText}>Redeem Rewards</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <MainButton title="Start Engaging!" onPress={handlePress} />
                </View>
                
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    welcomeTextContainer: {
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: 30,
        marginTop: 70,
        marginBottom: 220,
    },
    welcomeText: {
        color: "#FFFFFF",
        fontWeight: 800,
        fontSize: 40,
        lineHeight: 34.09,
    },
    desText: {
        color: "#FFFFFF",
        fontWeight: 400,
        fontSize: 20,
    },
    rewardsText: {
        color: "#FFFFFF",
        fontWeight: 400,
        fontSize: 20,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 150,
    }, 
})