import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
        color: 'white',
        marginTop:25,
        marginBottom:24
      }}
    >
      <ActivityIndicator size="large" color="sandybrown" />
      <Text style={{ marginTop: 15, color: 'sandybrown',fontSize:30 }}>Loading....</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  activityIndicator: {
    fontSize:30,
  },
});