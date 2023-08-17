import React, { useState } from 'react';
import styled from 'styled-components/native';

import { View, StyleSheet, PanResponder, ImageBackground } from 'react-native';

const bgImage = require('../assets/ball_rast.png');

const Ball = (/*{ xValueChange }*/) => {
  const [position, setPosition] = useState({ x: 175, y: 590 });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      // xValueChange(gesture.moveX);
      if (gesture.moveX >= 10 && gesture.moveX <= 330)
        setPosition({
          x: gesture.moveX,
        });
    },
  });
  return (
    <View
      style={[styles.draggable, { left: position.x, top: 600}]}
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
    zIndex:10,
  },
  containerImg: {
    width: 50,
    height: 100,
  },
});
export default Ball;