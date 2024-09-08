import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, TouchableOpacity, Modal, Alert} from 'react-native';
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
import MainButton from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ActivityScreen ({ route }) {
    const [activities, setActivities] = useState([])
    const [camerVisible, setCameraVisible] = useState(false);
    const [completedActivityId, setCompletedActivityId] = useState(null);
    const [totalPoints, setTotalPoints] = useState(0);
    const [totalBadges, setTotalBadges] = useState(0);
    const [unconfirmedCount, setUnconfirmedCount] = useState(0);
    const [totalPossiblePoints, setTotalPossiblePoints] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await fetch('http://app.engageathon.com/api/events/activity/86/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setActivities(data.activities || []);
                setTotalPoints(data.accmulated_points || 0);
                setTotalBadges(data.confirmed_count || 0);
                setUnconfirmedCount(data.unconfirmed_count || 0);
                setTotalPossiblePoints(data.total_possible_points || 0);
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
            if (completedActivity && !completedActivity.confirmed) {
                setTotalPoints(prevPoints => prevPoints + completedActivity.activity_points);
                setTotalBadges(prevBadges => prevBadges + 1);

                const updatedActivities = activities.map(activity =>
                    activity.id === completedActivity.id ? { ...activity, confirmed: true } : activity
                );
                setActivities(updatedActivities);
                setCompletedActivityId(completedActivityId);
            }
        }
    }, [route.params, activities]);

    useEffect(() => {
        if (totalBadges === 9) {
            setModalVisible(true);
        }
    }, [totalBadges]);

    const handleContinue = () => {
        navigation.navigate("CollectRewardsScreen");
        setModalVisible(false);
    };
{/*
    const handleActivityPress = (activity) => {
        setCameraVisible(true);
        setCompletedActivityId(activity.id);
    };
*/}

    const handleActivityPress = (activity) => {
        if (!activity.confirmed) {
            navigation.navigate('CongratsScreen', {
                activityId: activity.id,
                // badgeName: activity.badgeName,
            });
        } else {
            // Optionally show a message or perform other actions if the activity is already confirmed
            Alert.alert('Already Completed', 'This activity has already been completed.');
        }
    };

    const handleQRCodeScanned = () => {
        setCameraVisible(false); 
        const completedActivity = activities.find(activity => activity.id === completedActivityId);
        if (completedActivity) {
            navigation.navigate('CongratsScreen', {
                activityId: completedActivity.id,
                badgeName: completedActivity.badgeName,
            });
        }
    };
 
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/backgroundImage.png")}
                style={{ width: "100%", height: "100%", position: "absolute" }}
            />
            <View style={styles.scrollContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.userName}>Hi, {userName}</Text>
                    <Text style={styles.scanQRText}>Scan the QR code at each station to earn points and badges</Text>
                </View>
                
                <Text style={styles.activitiesText}>Activities</Text>
                <View style={styles.activityArea}>
                    {activities.map((activity) => (
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
                                    {activity.activity_name === "Beverage Station" && <MdOutlineWineBar size={22} color="#000000" />}
                                    {activity.activity_name === "Food Station" && <PiHamburgerBold size={22} color="#000000" />}
                                    {activity.activity_name === "Photo Booth" && <MdOutlineAddAPhoto size={22} color="#000000" />}
                                    {activity.activity_name === "Feature Station" && <TiStarburstOutline size={22} color="#000000" />}
                                    {activity.activity_name === "Photo at LED Screen" && <MdScreenshotMonitor size={22} color="#000000" />}
                                    {activity.activity_name === "Say Hi to the DJ" && <IoMdMusicalNote size={22} color="#000000" />}
                                </LinearGradient>
                                {activity.confirmed ? (
                                    <TbRosetteDiscountCheckFilled size={28} color="#32a852" style={styles.arrowIcon} />
                                ) : (
                                    <FaArrowRight size={20} color="#FFFFFF" style={styles.arrowIcon} />
                                )}

                            </View>
                            <Text style={styles.activityNameText}>{activity.activity_name}</Text>
                            <Text style={styles.pointText}>{activity.activity_points} Points</Text>
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
                            <Text style={styles.totalPoint}>of {totalPossiblePoints} Points</Text>
                        </View>
                    </View>     
                    <View style={styles.rewardsContainer}>
                        <Image 
                            source={require('../../assets/prizes/prize.png')} 
                            style={{ width: 30, height: 40 }}
                        />
                        <View style={styles.pointsContainer}>
                            <Text style={styles.getPoints}>{totalBadges}</Text>
                            <Text style={styles.totalPoint}>of {unconfirmedCount} Badges</Text>
                        </View>
                    </View>      
                </View>  
            </View>
            <Modal 
                visible={isModalVisible} 
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Congratulations!</Text>
                        <Text style={styles.modalMessage}>You have completed all the activities!</Text>
                        <MainButton title="Continue" onPress={handleContinue} />
                    </View>
                </View>
            </Modal>
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
        paddingBottom: 20,
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '85%',
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: '#393939',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    modalMessage: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 30,
        color: '#F1ECE6',
    },

})
