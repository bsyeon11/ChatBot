/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class JoinScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            useremail: "",
            username: "",
            userphone: "",
            password: "",
            passwordConfirm: "",
            success: 0
        }
    }
    _onRegister=()=>{
        if(this.state.password != this.state.passwordConfirm){
            Alert.alert("비밀번호를 재확인해주세요.");
        } else
        return fetch('http://10.0.2.2:4000/api/auth/register', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                useremail: this.state.useremail,
                username: this.state.username,
                userphone: this.state.userphone,
                password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({success: responseJson.success});
            if(this.state.success == 1) {
                Alert.alert(this.state.username + " 님 회원가입 되었습니다!");
                this.props.navigation.navigate('Start');
            }
            else if(this.state.success == 2){
                Alert.alert("이미 가입한 이메일입니다.");
            }
            else{
                Alert.alert("입력된 정보가 올바르지 않습니다.");
            }
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    render(){
        return (
            <LinearGradient colors={['#3DB7CC' ,'#86E57F']} useAngle={true} angle={60} location={[0.5, 1]} style={styles.linearGradient}>
            <View style = {styles.container}>
                <View style = {styles.lightBox}>
                <Text style={styles.join}>  회 원 가 입  </Text>
                <TextInput
                    placeholder="이메일"
                    style={styles.textinput}
                    onChangeText={(useremail)=>this.setState({useremail: useremail})}
                />
                <TextInput
                    placeholder="성함"
                    style={styles.textinput}
                    onChangeText={(username)=>this.setState({username: username})}
                />
                <TextInput
                    placeholder="연락처"
                    style={styles.textinput}
                    onChangeText={(userphone)=>this.setState({userphone: userphone})}
                />
                <TextInput
                    placeholder="비밀번호"
                    style={styles.textinput}
                    onChangeText={(password)=>this.setState({password: password})}
                />
                <TextInput
                    placeholder="비밀번호 확인"
                    style={styles.textinput}
                    onChangeText={(passwordConfirm)=>this.setState({passwordConfirm: passwordConfirm})}
                />
                <TouchableOpacity style={styles.button} onPress={this._onRegister}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>가 입 하 기</Text>
                </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row',}}>
                 <Text style={{fontStyle: 'italic', padding: 1, color: 'gray'}}>처음으로 돌아가려면 </Text>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('Start')}><Text style={{marginLeft: 10, padding: 1}}>처음으로</Text></TouchableOpacity>
                </View>
            </View>
            
            <View style = {styles.footer}>
                <Image source={require('./icon.png')} style={{height: 30, width: 35, marginRight: 10, marginBottom: 10}}/>
                <Text style={styles.logo}>서울과기대 공릉병원</Text>
            </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: 600,
        justifyContent: 'center',
        alignItems: 'center',
    },
    join: {
        color: '#8C8C8C',
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#8c8c8c',
    },
    lightBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        height: 400,
        borderRadius: 40,
        margin: 20,
    },
    footer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textinput: {
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        height: 40,
        width: 250,
        fontSize: 14,
        margin: 3,
    },
    button: {
        backgroundColor: '#3DB7CC',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        width: 250,
        height: 40,
        borderRadius: 15,
    },
    logo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
