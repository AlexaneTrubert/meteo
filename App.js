import { Text, SafeAreaView, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';
import { setDate } from 'date-fns';

import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

const API_KEY = "";
const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`;

export default function App() {
  // On créé un state pour savoir si on est en cours de chargement ou pas
  const [loading, setLoading] = useState(true);
  // On créé un state pour stocker les données de notre API
  const [data, setData] = useState(null);

  /* 1 - On récupère la localisation de l'utilisateur. 
  On veut récupérer l'info quand le composant est créé, et seulement 1 seule fois
  */
  useEffect(() => {
    setLoading(true);
    console.log("loading true : ", loading);
    /*
    Dans un useEffect on ne peut pas utiliser une fonction async
    */
    const getCordinates = async () => {
      /*
      /* on demande l'authorisation d'accéder à la localisation de l'utilisateur
      */
      const { status } = await Location.requestForegroundPermissionsAsync();
      /* S'il refuse, alors on ne fait rien (on peut imaginer retourner un message 
        lui signalant qu'il ne pourra pas utiliser l'application sans autoriser 
        la localisation)*/

      if (status !== 'granted') {
        console.log('Permission refusée');
        return;
      }

      /* On a besoin de garder en mémoire la localisation de l'utilisateur,
      on va donc créer un state
      */
      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    }

    getCordinates();
  }, [])

  // 2 - Réaliser une requête vers l'API de la météo
  const getWeather = async (location) => {
    try {
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude));
      setData(response.data)
      setLoading(false);
    } catch (error) {
      console.log("Erreur : ", error);
    }

    // 3 - Afficher les informations de la météo (ville, météo actuelle, température, etc.)
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />
      <Forecast data={data} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2E6E1',
    padding: 8,
  }
});
