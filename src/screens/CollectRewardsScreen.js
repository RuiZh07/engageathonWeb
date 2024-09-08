import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text } from 'react-native';
import MainButton from '../components/MainButton';
import { useNavigation } from '@react-navigation/native';

export default function CollectRewardsScreen () {
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

                <View style={styles.collectTextContainer}>
                    <Text style={styles.collectText}>Collect Your Rewards!</Text>
                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.desText}>Scan one final QR code to confirm your rewards </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <MainButton title="Scan QR Code" onPress={handlePress} />
                </View>
                
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    collectTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '50%',
        paddingHorizontal: 30,
    },
    collectText: {
        color: "#FFFFFF",
        fontWeight: 800,
        fontSize: 40,
        lineHeight: 39,
    },
    desText: {
        color: "#DBDBDB",
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