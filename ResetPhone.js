import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class ResetPhone extends Component {
    static defaultProps = {
        userphone: "",
    }

    constructor(props){
        super(props);
        this.state = {
            username: "",
        }
    }
    _onUpdate=(_id)=>{
        return fetch('http://10.0.2.2:4000/api/auth/'+_id, {  
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userphone: this.state.userphone
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
                Alert.alert("전화번호가 성공적으로 변경되었습니다.");
                this.props.navigation.navigate('MyProfileScreen')
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>전화번호</Text>
                </View>
                <View style={{width: '100%', paddingHorizontal: 10,}}>
                    <TextInput
                        placeholder="전화번호를 입력하세요"
                        style={styles.textinput}
                        onChangeText={(userphone)=>this.setState({userphone: userphone})}
                    />
                </View>
                <View style={{width: '100%', paddingHorizontal: 10, marginTop: 10}}>
                <LinearGradient colors={['#3DB7CC' ,'#86E57F']} useAngle={true} angle={60} location={[0.5, 1]} style={styles.button}>
                    <TouchableOpacity style={styles.button} onPress={()=>this._onUpdate(this.props.route.params.userid)}>
                    <Text style={styles.btText}>완 료</Text>
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
    content: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        padding: 10,
    },
    textinput: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 10,
      height: 40,
      fontSize: 15,
    },
    button: {
      borderRadius: 10,
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btText: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
  });