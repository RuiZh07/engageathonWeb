import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text } from 'react-native';
import MainButton from '../components/MainButton';
import { useNavigation } from '@react-navigation/native';

const imageMap = {
    1: require('../../assets/prizes/BeverageConnoisseur.png'),
    2: require('../../assets/prizes/GourmentExplorer.png'),
    3: require('../../assets/prizes/MemorableMoment.png'),
    4: require('../../assets/prizes/CommunityChampion.png'),
    5: require('../../assets/prizes/BrightLights.png'),
    6: require('../../assets/prizes/MusicLover.png')
}
const CongratsScreen = ({ route }) => {
    const { activityId, badgeName } = route.params;
    const navigation = useNavigation();

    const handelContinue = () => {
        navigation.navigate('ActivityScreen', { completedActivityId: activityId });
    }
    
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/backgroundImage.png")}
                style={{ width: "100%", height: "100%", position: "absolute" }}
            />
                <Text style={styles.congratulationsText}>Congratulations!</Text>
                <Text style={styles.pointsName}>You have earned 30 points and a badge!</Text>
                <View style={styles.prizeImage}>
                    <Image source={imageMap[activityId]} style={{ width: '50%' }} />
                </View>
                <Text style={styles.badgeNameText}>{badgeName}</Text>
                <MainButton title="Continue" onPress={handelContinue} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    congratulationsText: {
        fontSize: 50,
        lineHeight: 30,
        color: "#FFFFFF",
        alignSelf:'center',
        marginTop: '40%',
    },
    pointsName: {
        marginTop: '5%',
        fontSize: 20,
        color: '#F1ECE6',
        alignSelf: 'center',
        fontWeight: 400,
    },
    prizeImage: {
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
    },
    badgeNameText: {
        color: '#FAB81E',
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: '20%',
    }
})

export default CongratsScreen;