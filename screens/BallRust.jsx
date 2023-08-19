import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Button,
} from 'react-native';
import { ImageBackground, Dimensions } from 'react-native';
import Ball from '../components/Ball';
import styled from 'styled-components/native';
import Obstacles from '../components/Obstacles';
const bgImage = require('../assets/RunTrack.png');
const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const BallRust = () => {
  const [ballPosition, setBallPosition] = useState({ x: 175, y: 490 });
  const [score, setScore] = useState(0);
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const [obstaclesUp, setObstaclesUp] = useState(1);
  const [obstaclesWidth, setObstaclesWidht] = useState(100);

  const gap = 100;
  let obstaclesTimerId;
  const obstacleSpeed = 10;
  // const [side, setSide] = useState('left');
  const ballValueChange = (xPosition) => {
    setBallPosition((ballPosition) => ({
      ...ballPosition,
      x: xPosition,
    }));
  };

  //start first obstacle
  useEffect(() => {
    if (obstaclesUp < 853) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesUp((obstaclesUp) => obstaclesUp + obstacleSpeed);
      }, 10);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setScore((score) => score + 1);
      setObstaclesUp(0);
      setObstaclesWidht(Math.floor(Math.random() * (284 + 1)));
      // setObstaclesNegHeight( - Math.random() * 100)
    }
  }, [obstaclesUp]);

  return (
    <Space source={bgImage}>
      <Obstacles
        topCoordinate={obstaclesUp}
        gap={gap}
        screenWidth={screenWidth}
        obstaclesWidth={obstaclesWidth}
      />
      <Ball ballValueChange={ballValueChange} />
    </Space>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    magrginBottom: 24,
  },
});
export default BallRust;
