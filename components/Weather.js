import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Weather({ forecast }) {

    const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <View style={styles.container}>
            <Text>{forecast.hour}h</Text>
            
            <Image 
            source={{ uri: getIcon(forecast?.icon) }} 
            style={styles.image} />

            <Text style={styles.temp}>{forecast.temp}°C</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        height: 140,
        width: 75,
        paddingVertical: 6,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        borderRadius: 50
    },
    image: {
        width: 50,
        height: 50
    },
    temp: {
        fontSize: 18,
        fontWeight: "bold"
    }
});