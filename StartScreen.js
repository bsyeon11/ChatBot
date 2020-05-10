import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';

export default class StartScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.title}>
          <Text style={{fontSize:35,color:'black',fontWeight: 'bold'}}>서울과기대</Text>
          <Text style={{fontSize:35,color:'black',fontWeight: 'bold'}}>공릉병원</Text>
        </View>
        <View style={styles.content}>
        </View>
        <View style={styles.footer}>
          <Button title='회원가입'>/</Button>
          <Button title='로그인'>/</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    width:'100%',
    height:'25%',
    //backgroundColor: '#ff9a9a',
  },
  title: {
    width:'100%',
    height:'20%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#9aa9ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:30,
    //backgroundColor: '#d6ca1a',
  },
  footer: {
    width:'100%',
    height:'40%',
    //backgroundColor: '#1ad657',
  },
});
