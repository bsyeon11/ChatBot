import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler'

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
         </View>
         <View style={styles.footer}>
          
          <LinearGradient colors={['#3DB7CC' ,'#86E57F']} useAngle={true} angle={60} location={[0.5, 1]} style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={this._Logout}>
            <Text style={styles.btText}>로그아웃</Text>
            </TouchableOpacity>
          </LinearGradient>
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
    flex: 8,
  },
  footer: {
    flex: 2,
    alignItems: 'center',
  },
  button: {
    margin: 10,
    borderRadius: 20,
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  }

});
