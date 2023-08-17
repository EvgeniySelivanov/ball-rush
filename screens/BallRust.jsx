import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { ImageBackground } from 'react-native';
import Ball from '../components/Ball';
import styled from 'styled-components/native';
const Space = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: start;
  margin-top:25px;
  margin-bottom:25px;
`;
const bgImage = require('../assets/starry_sky.jpg');
const BallRust = () => {
  return (
    <Space
    source={bgImage}
    resizeMode="cover"
  >
    {/* <TouchableOpacity onPress={moveBallToGoal} style={styles.button}>
      <View >
        {dataGame.game ? (
          <Text style={styles.buttonText}>Start {`\n`}game</Text>
        ) : (
          <Text style={styles.buttonGameOver}>
            Game Over {`\n`}Press to start
          </Text>
        )}
      </View>
    </TouchableOpacity> */}
    {/* <StyledText>Score:{dataGame.score}</StyledText> */}
    <Ball  />
    {/* <Animated.View style={[styles.ball, ballPosition.getLayout()]} /> */}
   
  </Space>
  );
}

export default BallRust;
