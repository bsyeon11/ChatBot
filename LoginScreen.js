import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import deviceStorage from './deviceStorage';

export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            useremail: "",
            password: "",
            checkLogin: 0
        }
    }
    _onSubmit=()=>{
        return fetch('http://10.0.2.2:4000/api/auth/login', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                useremail: this.state.useremail,
                password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({checkLogin: responseJson.success});
            if(this.state.checkLogin == 1) {
                Alert.alert(responseJson.data.username+" 님 반갑습니다.");
                deviceStorage.saveItem("id_token", responseJson.access_token);
                this.props.navigation.navigate('Chat');
            }
            else{
                Alert.alert("아이디 또는 비밀번호가 올바르지 않습니다.");
            }
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    render() {
    return (
        <View style={styles.container}>
            <View style = {{flexDirection: 'row', margin: 15, }}>
                <Image source={require('./colorLogo1.png')} style={{height: 30, width: 32, marginRight: 10, }}/>
                <Text style={styles.logo}>서울과기대 공릉병원</Text>
            </View>
            <TextInput
                placeholder="이메일"
                style={styles.textinput}
                onChangeText={(useremail)=>this.setState({useremail: useremail})}         
            />
            <TextInput
                placeholder="비밀번호"
                style={styles.textinput}
                onChangeText={(password)=>this.setState({password: password})}
            />
            <LinearGradient colors={['#3DB7CC' ,'#86E57F']} useAngle={true} angle={60} location={[0.5, 1]} style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={this._onSubmit}>
                <Text style={styles.btText}>로그인</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Join')}><Text style={{margin: 10, padding: 1}}>회원가입</Text></TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Reset')}><Text style={{margin: 10, padding: 1}}>비밀번호 찾기</Text></TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Start')}><Text style={{margin: 10, padding: 1}}>처음으로</Text></TouchableOpacity>
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
  textinput: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 40,
    width: 250,
    fontSize: 14,
    margin: 3,
    paddingLeft: 15,
  },
  button: {
    margin: 10,
    borderRadius: 25,
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  logo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,
  },
});
