// Loading.js
import React from 'react';
// react-native 화면을 구성할 요소들
import { StyleSheet, Text, View, StatusBar } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <Text style={styles.text}>서울과기대</Text>
      <Text style={styles.text}>공릉병원</Text>
    </View>
  )
}

// styles로 StyleSheet의 css를 사용합니다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 40,
    paddingVertical: 100,
    backgroundColor: "#FAEBD7"
  },
  text: {
    color: "#2c2c2c",
    fontSize: 30
  }
})

export default Loading;