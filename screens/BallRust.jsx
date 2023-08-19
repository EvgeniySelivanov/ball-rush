import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ImageBackground, Dimensions } from 'react-native';
import Ball from '../components/Ball';
import styled from 'styled-components/native';
import Obstacles from '../components/Obstacles';
import Bonus from '../components/Bonus';
const bgImage = require('../assets/RunTrack.png');
const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
`;
const StyledText = styled.Text`
  position: absolute;
  top: 130px;
  left: 5px;
  color: #099109;
  font-size: 40px;
  font-weight: 700;
`;

const BallRust = () => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const [isGameOver, setIsGameOver] = useState(true);
  const [ballPosition, setBallPosition] = useState({ x: 175, y: 490 });
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [bonusPosition, setBonusPosition] = useState({
    x: screenWidth / 2 - 25,
    y: 150,
  });
  const [obstaclesUp, setObstaclesUp] = useState(0);
  const [obstaclesWidth, setObstaclesWidht] = useState(100);
  let obstaclesTimerId;
  let bonusTimerId;
  let counter;
  const gap = 100;
  const obstacleSpeed = 15;
  let renderSpeed=30;

  const ballValueChange = (xPosition) => {
    setBallPosition((ballPosition) => ({
      ...ballPosition,
      x: xPosition,
    }));
  };

  //start first obstacle
  useEffect(() => {
    if (obstaclesUp < 853&&isGameOver) {
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
  }, [isGameOver,obstaclesUp]);

  useEffect(() => {
    if (obstaclesUp < 853&&isGameOver) {
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
      bonusPosition.y <= ballPosition.y + 20
    ) {
      clearInterval(bonusTimerId);
      setBonus((bonus) => bonus + 1);
    }
  }, [bonusPosition]);
  const gameOver = () => {
    clearInterval(bonusTimerId);
    clearInterval(obstaclesTimerId);
    setScore(0);
    setBonus(0);
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
    <Space source={bgImage}>
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
      <Obstacles
        topCoordinate={obstaclesUp}
        gap={gap}
        screenWidth={screenWidth}
        obstaclesWidth={obstaclesWidth}
      />
      {<Bonus bonusPosition={bonusPosition} />}
      <StyledText>Score:{score + bonus}</StyledText>
      <Ball ballValueChange={ballValueChange} />
    </Space>
  );
};

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
export default BallRust;
