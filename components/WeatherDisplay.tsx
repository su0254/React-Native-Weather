import React, { useRef } from 'react';
import { StyleSheet, Text, Image, Animated } from 'react-native';

const WeatherDisplay = ({ weatherData, selectedTown }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [weatherData]);

  return (
    <Animated.View style={[styles.weatherContainer, { opacity: fadeAnim }]}>
      <Text style={styles.weatherTitle}>Weather in {selectedTown}</Text>
      <Image
        source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
        style={styles.weatherIcon}
      />
      <Text style={styles.tempText}>{weatherData.main.temp}°C</Text>
      <Text style={styles.text}>Humidity: {weatherData.main.humidity}%</Text>
      <Text style={styles.text}>Weather: <Text style={styles.boldText}>{weatherData.weather[0].description}</Text></Text>
      <Text style={styles.text}>Wind Speed: {weatherData.wind.speed} m/s</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  weatherTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tempText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  text: {
    fontSize: 18,
    color: '#555',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000', 
  },
});

export default WeatherDisplay;
