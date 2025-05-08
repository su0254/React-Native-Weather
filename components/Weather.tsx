import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Alert } from 'react-native';
import TownSelector from './TownSelector';
import WeatherDisplay from './WeatherDisplay';

const towns = [
  { name: 'Bnei Brak', lat: 32.0731, lon: 34.8260 },
  { name: 'Tel Aviv', lat: 32.0853, lon: 34.7818 },
  { name: 'Jerusalem', lat: 31.7683, lon: 35.2137 },
  { name: 'Haifa', lat: 32.7940, lon: 34.9896 },
];

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTown, setSelectedTown] = useState(towns[0]); // Default to Bnei Brak

  const fetchWeatherData = async (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01b89b903712d6fab74d8147740a4dba&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        Alert.alert("ERROR!!",response.status.toString())
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setWeatherData(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedTown.lat, selectedTown.lon);
  }, [selectedTown]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Town</Text>
      <TownSelector towns={towns} selectedTown={selectedTown} setSelectedTown={setSelectedTown} />
      {loading ? (
        <ActivityIndicator size="large" color="#555" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <WeatherDisplay weatherData={weatherData} selectedTown={selectedTown.name} />
      )}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
