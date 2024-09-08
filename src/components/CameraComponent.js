import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import QrReader from 'react-qr-reader';
import { View, Text, StyleSheet } from 'react-native';

const CameraComponent = () => {
    const [qrResult, setQrResult] = useState(null);
    const navigation = useNavigation();

    const handleQrScan = (data) => {
        if (data) {
            setQrResult(data);
            // Assuming data contains the activityId and badgeName in some format
            // Adjust this to match your QR code data format
            const [activityId, badgeName] = data.split(','); 
            navigation.navigate('CongratsScreen', { activityId });
        }
    };

    const handleError = (error) => {
        console.error("QR Code Scanning Error: ", error);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan QR Code</Text>
            <QrReader
                onScan={handleQrScan}
                onError={handleError}
                style={styles.qrReader}
            />
            {qrResult && <Text>QR Code Result: {qrResult}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    qrReader: {
        width: '100%',
        height: 300,
    },
});

export default CameraComponent;
