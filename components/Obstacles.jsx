import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';



const Obstacles = ({topCoordinate,gap,screenWidth,obstaclesWidth}) => {
  const Figure = styled(View)`
  position: 'absolute';
  height: 30px;
  border: 2px solid #ffee00;
  background-color: #fffb23;
  left:0px;
  top: ${topCoordinate}px;
  width:${obstaclesWidth}px;
`;
const Figure2 = styled(View)`
  position: 'absolute';
  height: 30px;
  border: 2px solid #09ff00;
  background-color: #ffee00;
  left: ${obstaclesWidth+gap}px;
  top: ${topCoordinate}px;
  width: ${screenWidth-gap-obstaclesWidth}px;
`;
  return (
    <>
      <Figure></Figure>
      <Figure2></Figure2>

    </>
  );
};

export default Obstacles;
