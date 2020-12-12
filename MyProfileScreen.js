import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class MyProfileScreen extends Component {
    state = {
        _id: "",
        username: "",
        useremail: "",
        userphone: "",
    }

    componentDidMount() {
        fetch('http://10.0.2.2:4000/api/auth/check', {  
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                _id: responseJson._id,
                username: responseJson.username,
                useremail: responseJson.useremail,
                userphone: responseJson.userphone,
             });
        })
        .catch((error) =>{
            Alert.alert("로그인 후 이용가능합니다.");
            this.props.navigation.navigate('Chat');
            console.error(error);
        });
    }

  render() {
    return (
        <View style={styles.container}>
            <View style={[styles.content, {marginVertical: 0, height: 50 }]}>
                <Text style={{color: 'gray'}}>계정정보</Text>
            </View>
            <View style={[styles.content, {marginTop: 0}]}>        
                <View style={{width: '60%'}}><Text style={{fontSize: 15,}}>이메일  </Text></View>
                <View style={styles.info}><Text style={{fontSize: 15, color: '#1F618D'}}>{this.state.useremail}</Text></View>
            </View>
            <View style={{width: '100%', height: 60, backgroundColor: 'white'}}>
                <TouchableOpacity style={styles.content}>           
                    <View style={{width: '60%'}}><Text style={{fontSize: 15,}}>이름      </Text></View>
                    <View style={styles.info}><Text style={{fontSize: 15, color: '#1F618D'}}>{this.state.username}</Text></View>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', height: 60, backgroundColor: 'white'}}>
                <TouchableOpacity style={styles.content}>           
                    <View style={{width: '60%'}}><Text style={{fontSize: 15,}}>전화번호</Text></View>
                    <View style={styles.info}><Text style={{fontSize: 15, color: '#1F618D'}}>{this.state.userphone}</Text></View>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', height: 60, backgroundColor: 'white'}}>
                <TouchableOpacity style={styles.content} onPress={()=>this.props.navigation.navigate('ResetPassword', {userid: this.state._id})}>           
                    <View style={{width: '60%'}}><Text style={{fontSize: 15,}}>비밀번호 변경</Text></View>
                </TouchableOpacity>
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
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
  },
  info: {
    width: '40%', 
    flexDirection: 'row-reverse',
  },
});
