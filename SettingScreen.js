import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class SettingScreen extends Component {
  state = {

  }

  _Logout=()=>{
    return fetch('http://10.0.2.2:4000/api/auth/logout', {  
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(()=>{
        Alert.alert("로그아웃 되었습니다. 홈으로 이동합니다.");
        this.props.navigation.navigate('Start')
    })
    .catch((error) =>{
        console.error(error);
    });
}

  render() {
    return (
        <View style={styles.container}>
         <View style={styles.content}>
           <TouchableOpacity>           
             <Text style={styles.title}>프로필 수정</Text></TouchableOpacity>
         </View>
         <View style={styles.content}>
           <TouchableOpacity>           
             <Text style={styles.title}>개인정보처리방침</Text></TouchableOpacity>
         </View>
         <View style={styles.content}>           
             <Text style={styles.title}>버전정보</Text>
             <Text style={[styles.title, {color: '#3DB7CC'}]}>    ver 1.0.0</Text>
         </View>
         <View style={styles.content}>
           <TouchableOpacity onPress={this._Logout}>           
             <Text style={styles.title}>로그아웃</Text></TouchableOpacity>
         </View>
         <View style={styles.content}>
           <TouchableOpacity>           
             <Text style={styles.title}>탈퇴하기</Text></TouchableOpacity>
         </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 15,
    marginVertical: 1,
  },
  title: {
    fontSize: 15,
  }

});
