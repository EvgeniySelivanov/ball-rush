import React, { useState } from 'react';


import { View, StyleSheet, PanResponder, ImageBackground } from 'react-native';

const bgImage = require('../assets/ball_rast.png');

const Ball = ({ ballValueChange }) => {
  const [position, setPosition] = useState({ x: 175, y: 490 });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      ballValueChange(gesture.moveX);
      if (gesture.moveX >= 10 && gesture.moveX <= 330)
        setPosition({
          x: gesture.moveX,
        });
    },
  });
  return (
    <View
      style={[styles.draggable, { left: position.x, top: 490 }]}
      {...panResponder.panHandlers}
    >
      <ImageBackground source={bgImage} style={styles.containerImg}>
        {/* Контент компонента */}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  draggable: {
    position: 'absolute',
    width: 50,
    height: 100,
    zIndex: 10,
  },
  containerImg: {
    width: 50,
    height: 100,
  },
});
export default Ball;
