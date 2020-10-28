import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class ResetPassword extends Component {
    static defaultProps = {
        userid: "",
    }

    constructor(props){
        super(props);
        this.state = {
            password: "",
            password2: "",
        }
    }
    _onReset=(_id)=>{
        console.log(_id);
        if (this.state.password && this.state.password == this.state.password2) 
        return fetch('http://10.0.2.2:4000/api/auth/'+_id, {  
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
                Alert.alert("비밀번호가 성공적으로 변경되었습니다.");
                this.props.navigation.navigate('Start')
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
            <View>
                <TextInput
                    placeholder="비밀번호"
                    style={styles.textinput}
                    onChangeText={(password)=>this.setState({password: password})}
                />
                <TextInput
                    placeholder="비밀번호 확인"
                    style={styles.textinput}
                    onChangeText={(password2)=>this.setState({password2: password2})}
                />
            
                <LinearGradient colors={['#3DB7CC' ,'#86E57F']} useAngle={true} angle={60} location={[0.5, 1]} style={styles.button}>
                    <TouchableOpacity style={styles.button} onPress={()=>this._onReset(this.props.route.params.userid)}>
                    <Text style={styles.btText}>비밀번호 재설정</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
        )
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