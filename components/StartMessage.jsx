import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
const StartMessage = ({isGameOver}) => {
  return (
 
        <View>
          {isGameOver ? (
            <Text></Text>
          ) : (
            <Text style={styles.buttonGameOver}>
              Game Over {`\n`}Touch screen to start
            </Text>
          )}
        </View>
     
  );
}
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 100,
    left: 185,
    width: 170,
    height: 70,
    margin: 10,
    padding: 5,
    borderRadius: 15,
    zIndex: 20,
  },
 
  buttonGameOver: {
    top:90,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 37,
    color: 'blue',
    backgroundColor:'white'
  },
});
export default StartMessage;
