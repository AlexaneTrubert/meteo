import React, { useEffect, useState } from "react";
import { ScrollView, Text, Image, StyleSheet, View } from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import Weather from "./Weather";

export default function Forecast({ data }) {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const forecastData = data.list.map(f => {
            const dateF = new Date(f.dt * 1000);
            return ({
                date: dateF,
                hour: dateF.getHours(),
                temp: Math.round(f.main.temp),
                icon: f.weather[0].icon,
                name: format(dateF, "EEEE", { locale: fr })
            })
        });

        let newForecastData = forecastData.map(forecast => {
            return forecast.name;
        }).filter((day, index, self) => {
            return self.indexOf(day) === index;
        }).map((day) => {
            return {
                day,
                data: forecastData.filter(forecast => forecast.name === day)
            }
        });


        setForecast(newForecastData);
    }, [data])


    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={StyleSheet.scroll}>
            {forecast.map(f => (
                <View id="{f.name}">
                    <Text style={styles.day}>{f.day.toUpperCase()}</Text>
                    <View style={styles.container}>
                    {f.data.map(w => <Weather forecast={w} id="{w.temp}"/>)}
                    </View>
                </View>
            ))}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        height: "35%"
    },
    day: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        marginLeft: 5
    },
    container: {
        flexDirection: "row",
        marginLeft: 5,
        marginRight: 5
    }
});