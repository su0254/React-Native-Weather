
import { StyleSheet, Text, View, TextInput,Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ImageBackground } from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  const handleBlur = () => {
    if (userName) {
      Toast.show({
        text1: `Hello to you, ${userName}!`,
        position: 'top',
        type: 'info',
        // color: "#ff5722" 
      });
    }
  };

  return (
    <ImageBackground 
    source={require('../assets/sky.png')} 
    style={styles.background}
    resizeMode='cover'
    >
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Weather Forecast</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
        onBlur={handleBlur}
      />
      <Button 
        title="Go to Weather Page" 
        onPress={() => navigation.navigate('Weather')}
        color="#ff5722" 
      />
      <Toast ref={() => Toast.setRef(React.forwardRef())} />
    </View>
    
  </ImageBackground>
  );
}

export default Home;

const styles = StyleSheet.create({
  
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%', // Adjust width as needed
  },
});
