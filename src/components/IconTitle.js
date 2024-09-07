import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function IconTitle () {
    return (
        <View style={styles.engageathonLogoContainer}>
            <Image source={require("../../assets/eaLogo.png")} style={{ width: 44, height: 40 }} />
            <Image source={require("../../assets/EngageATHON.png")} />
        </View>
    )
}

const styles= StyleSheet.create({
    engageathonLogoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 30,
        marginTop: 100,
    },
})