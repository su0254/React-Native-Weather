import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

const TownSelector = ({ towns, selectedTown, setSelectedTown }) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  const handlePress = (town) => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      setSelectedTown(town);
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View>
      {towns.map((town) => (
        <TouchableOpacity key={town.name} onPress={() => handlePress(town)}>
          <Animated.View style={{ transform: [{ scale: selectedTown.name === town.name ? animatedValue : 1 }] }}>
            <Text style={[styles.townText, selectedTown.name === town.name && styles.selectedTown]}>
              {town.name}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  townText: {
    fontSize: 20,
    marginVertical: 5,
    color: '#555',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  selectedTown: {
    fontWeight: 'bold',
    color: '#ff5722', // Highlight color for selected town
    backgroundColor: '#d0d0d0',
  },
});

export default TownSelector;
