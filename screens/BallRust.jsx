import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ImageBackground, Dimensions } from 'react-native';
import Ball from '../components/Ball';
import styled from 'styled-components/native';
import Obstacles from '../components/Obstacles';
import Bonus from '../components/Bonus';
import StartMessage from '../components/StartMessage';
const bgImage = require('../assets/RunTrack.png');

const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
`;
const StyledText = styled.Text`
  position: absolute;
  top: 43px;
  left: 110px;
  color: #31aa02;
  font-size: 50px;
  font-weight: 700;
`;

const BallRust = () => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const [isGameOver, setIsGameOver] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 175, y: 490 });
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState({ quantity: 0, visibility: true });
  const [bonusPosition, setBonusPosition] = useState({
    x: screenWidth / 2 - 25,
    y: 150,
  });
  const [obstaclesUp, setObstaclesUp] = useState(0);
  const [obstaclesWidth, setObstaclesWidht] = useState(100);
  let obstaclesTimerId;
  let bonusTimerId;
  const gap = 100;
  const obstacleSpeed = 15;
  let renderSpeed = 30;

  const ballValueChange = (xPosition) => {
    setBallPosition((ballPosition) => ({
      ...ballPosition,
      x: xPosition,
    }));
  };
  //start first obstacle
  useEffect(() => {
    if (obstaclesUp < screenHeight && isGameOver) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesUp((obstaclesUp) => obstaclesUp + obstacleSpeed);
      }, renderSpeed);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setScore((score) => score + 1);
      setObstaclesUp(0);
      setObstaclesWidht(Math.floor(Math.random() * (284 + 1)));
      setBonusPosition((bonusPosition) => ({
        ...bonusPosition,
        x: Math.floor(Math.random() * (350 + 1)),
      }));
    }
  }, [isGameOver, obstaclesUp]);

  useEffect(() => {
    if (obstaclesUp < screenHeight && isGameOver) {
      bonusTimerId = setInterval(() => {
        setBonusPosition((bonusPosition) => ({
          ...bonusPosition,
          y: obstaclesUp + 150,
        }));
      }, renderSpeed);
      return () => {
        clearInterval(bonusTimerId);
      };
    }
  }, [obstaclesUp]);
  
  useEffect(() => {
    if ((obstaclesUp-150) > ballPosition.y && isGameOver) {
      setBonus((bonus) => ({
        ...bonus,
        visibility: true,
      }));
    }
  }, [obstaclesUp]);


  //check collisions
  useEffect(() => {
    if (
      (ballPosition.x <= obstaclesWidth - 25 ||
        ballPosition.x >= obstaclesWidth + gap + 25) &&
      ballPosition.y <= obstaclesUp + 30 &&
      obstaclesUp < ballPosition.y + 100
    ) {
      console.log('game over');
      gameOver();
    }
  }, [obstaclesUp]);

  useEffect(() => {
    if (
      bonusPosition.x >= ballPosition.x - 50 &&
      bonusPosition.x <= ballPosition.x + 50 &&
      bonusPosition.y >= ballPosition.y &&
      bonusPosition.y <= ballPosition.y + 15
    ) {
      clearInterval(bonusTimerId);
      setBonus((bonus) => ({
        ...bonus,
        quantity: bonus.quantity + 1,
        visibility: false,
      }));
    }
  }, [bonusPosition]);

  const gameOver = () => {
    clearInterval(bonusTimerId);
    clearInterval(obstaclesTimerId);
    setScore(0);
    setBonus((bonus) => ({
      ...bonus,
      quantity: 0,
    }));
    setBonusPosition({
      x: screenWidth / 2 - 25,
      y: 150,
    });
    setObstaclesUp(0);
    setObstaclesWidht(100);
    setIsGameOver(false);
  };
  const startGame = () => {
    console.log('game start');
    setIsGameOver(true);
  };

  return (
    <TouchableWithoutFeedback onPress={startGame}>
    <Space source={bgImage}>
    
      <Obstacles
        topCoordinate={obstaclesUp}
        gap={gap}
        screenWidth={screenWidth}
        obstaclesWidth={obstaclesWidth}
      />
      {bonus.visibility && <Bonus bonusPosition={bonusPosition} />}
      <StyledText>Score:{isGameOver?(score + bonus.quantity):0}</StyledText>
      <StartMessage isGameOver={isGameOver}/>
      <Ball ballValueChange={ballValueChange} />
      
    </Space>
    </TouchableWithoutFeedback>
    
    
   
  );
};


export default BallRust;
