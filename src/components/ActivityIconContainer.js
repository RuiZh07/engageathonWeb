import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const ActivityIconContainer = ({ iconName }) => {
  
  return (
    <TouchableOpacity onPress={onPress} style={{ width: "100%" }}>
      <LinearGradient
        colors={["#FF8D00", "#FFDE1A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 35,
  },
  buttonText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 17,
    letterSpacing: 0.4,
    color: "#FFFFFF",
  },
});
