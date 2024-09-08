import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PiHamburgerBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineWineBar } from "react-icons/md";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoMdMusicalNote } from "react-icons/io";
import { LinearGradient } from "expo-linear-gradient";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { TiStarburstOutline } from "react-icons/ti";
import { MdScreenshotMonitor } from "react-icons/md";

const activities = [
    { id: 1, name: "Beverage Station", points: 30, badgeName: "Beverage Connoisseur", icon: <MdOutlineWineBar size={22} color="#000000" /> },
    { id: 2, name: "Food Station", points: 30, badgeName: "Gourment Explorer", icon: <PiHamburgerBold size={22} color="#000000" /> },
    { id: 3, name: "Photo Booth", points: 30, badgeName: "Memorable Moment", icon: <MdOutlineAddAPhoto size={22} color="#000000" /> },
    { id: 4, name: "Feature Stations", points: 30, badgeName: "Community Champion", icon: <TiStarburstOutline size={22} color="#000000" /> },
    { id: 5, name: "Photo at LED Screen", points: 30, badgeName: "Bright Lights", icon: <MdScreenshotMonitor size={22} color="#000000" /> },
    { id: 6, name: "Say Hi to the DJ", points: 30, badgeName: "Music Lover", icon: <IoMdMusicalNote size={22} color="#000000" /> },
];
export default function ActivityScreen ({ route }) {
    const [activities, setActivities] = useState([])
    const [camerVisible, setCameraVisible] = useState(false);
    const [completedActivityId, setCompletedActivityId] = useState(null);
    const [totalPoints, setTotalPoints] = useState(0);
    const [totalBadges, setTotalBadges] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    {/*
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response  = await fetch('http://app.engageathon.com/api/events/activity/86/');
                const data = await response.json();
                setActivities(data.activities);

                setTotalPoints(data.accmulated_points);
                setTotalBadges(data.confirmed_count);
            } catch (error) {
                console.error('Error fetching activities', error);
            }
        };
        fetchActivities();
    }, [])
    */}
    useEffect(() => {
        if (route.params && route.params.completedActivityId) {
            setCompletedActivityId(route.params.completedActivityId);
            const completedActivity = activities.find(activity => activity.id === route.params.completedActivityId);
            if (completedActivity) {
                setTotalPoints(prevPoints => prevPoints + completedActivity.points);
                setTotalBadges(prevBadges => prevBadges + 1);
            }
        }
    }, [route.params, activities]);

    const handleActivityPress = (activity) => {
        navigation.navigate('CongratsScreen', {
            activityId: activity.id,
            badgeName: activity.badgeName,
        });
    };
 
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/backgroundImage.png")}
                style={{ width: "100%", height: "100%", position: "absolute" }}
            />
            <View style={styles.scrollContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.userName}>Hi</Text>
                    <Text style={styles.scanQRText}>Scan the QR code at each station to earn points and badges</Text>
                </View>
                
                <Text style={styles.activitiesText}>Activities</Text>
                <View style={styles.activityArea}>
                    {activities.map((activity, index) => (
                        <TouchableOpacity 
                            key={activity.id} 
                            style={styles.activityContainer}
                            onPress={() => handleActivityPress(activity)}
                        >
                            <View style={styles.iconsContainer}>
                                <LinearGradient
                                    colors={["#FF8D00", "#FFDE1A"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.linearGradientBackground}
                                >
                                    {activity.icon}
                                </LinearGradient>
                                {completedActivityId === activity.id ? (
                                    <TbRosetteDiscountCheckFilled size={28} color="#32a852" style={styles.arrowIcon} />
                                ) : (
                                    <FaArrowRight size={20} color="#FFFFFF" style={styles.arrowIcon} />
                                )}

                            </View>
                            <Text style={styles.activityNameText}>{activity.name}</Text>
                            <Text style={styles.pointText}>{activity.points} Points</Text>
                        </TouchableOpacity>
                    ))}
                </View>   
                <Text style={styles.rewardsEarnedText}>Rewards Earned</Text> 
                <View style={styles.rewardArea}>  
                    <View style={styles.rewardsContainer}>
                        <Image 
                            source={require('../../assets/prizes/star-badge.png')} 
                            style={{ width: 40, height: 40 }}
                        />
                        <View style={styles.pointsContainer}>
                            <Text style={styles.getPoints}>{totalPoints}</Text>
                            <Text style={styles.totalPoint}>of 180 Points</Text>
                        </View>
                    </View>     
                    <View style={styles.rewardsContainer}>
                        <Image 
                            source={require('../../assets/prizes/prize.png')} 
                            style={{ width: 30, height: 40 }}
                        />
                        <View style={styles.pointsContainer}>
                            <Text style={styles.getPoints}>{totalBadges}</Text>
                            <Text style={styles.totalPoint}>of 6 Badges</Text>
                        </View>
                    </View>      
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
    titleContainer: {
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 20,
    },
    userName: {
        fontSize: 32,
        color: '#FFFFFF',
    },
    scanQRText: {
        paddingTop: 10,
        fontSize: 18,
        color: '#DBDBDB',
    },
    activitiesText: {
        fontSize: 30,
        paddingVertical: 10,
        paddingLeft: 30,
        color: '#FFE600',
    },
    activityArea: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    activityContainer: {
        width: '48%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FAB81E',
        padding: 15,
        marginBottom: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    linearGradientBackground: {
        padding: 18,
        borderRadius: 15,
    },
    arrowIcon: {
        paddingLeft: 60,
    },
    activityNameText: {
        paddingTop: 10,
        fontSize: 20,
        color: '#FFFFFF',
        lineHeight: 21,
    },
    pointText: {
        paddingTop: 10,
        fontSize: 15,
        color: '#ABABAB',
        lineHeight: 18,
    },
    rewardsEarnedText: {
        fontSize: 34,
        //paddingVertical: 3,
        paddingLeft: 30,
        color: '#FFE600',
    },
    rewardArea: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'space-between',
    },
    rewardsContainer: {
        width: '48%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FAB81E',
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
    },
    pointsContainer: {
        marginLeft: 10,
    },
    getPoints:{
        fontSize: 20,
        color: '#FFFFFF',
        lineHeight: 21,
    },
    totalPoint: {
        fontSize: 15,
        color: '#ABABAB',
        lineHeight: 18,
    }
})
