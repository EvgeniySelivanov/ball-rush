import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const ButtonStart = ({startGame,isGameOver}) => {
  return (
    <TouchableOpacity onPress={startGame} style={styles.button}>
        <View>
          {isGameOver ? (
            <Text style={styles.buttonText}>Start {`\n`}game</Text>
          ) : (
            <Text style={styles.buttonGameOver}>
              Game Over {`\n`}Press to start
            </Text>
          )}
        </View>
      </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 100,
    left: 185,
    width: 170,
    height: 70,
    backgroundColor: 'black',
    margin: 10,
    padding: 5,
    borderRadius: 15,
    zIndex: 20,
  },
  buttonText: {
    paddingTop: 10,
    fontSize: 17,
    color: 'green',
    textAlign: 'center',
  },
  buttonGameOver: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 17,
    color: 'red',
  },
});
export default ButtonStart;
