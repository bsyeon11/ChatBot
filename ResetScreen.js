import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class ResetScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id: "",
            useremail: "",
            username: "",
            userphone: "",
            success: 0,
            isAuth: false
        }
    }
    _onSubmit=()=>{
        return fetch('http://10.0.2.2:4000/api/auth/isValid', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                useremail: this.state.useremail,
                username: this.state.username,
                userphone: this.state.userphone,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                success: responseJson.success,
                _id: responseJson._id
            });
            if(this.state.success == 1) {
                this.props.navigation.navigate('ResetPassword', {userid: this.state._id})
              this.setState({isAuth: true});
            }
            else{
                Alert.alert("입력한 정보가 올바르지 않습니다.");
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
                placeholder="성명"
                style={styles.textinput}
                onChangeText={(username)=>this.setState({username: username})}
            />
            <TextInput
                placeholder="전화번호"
                style={styles.textinput}
                onChangeText={(userphone)=>this.setState({userphone: userphone})}
            />
            <LinearGradient colors={['#3DB7CC' ,'#86E57F']} useAngle={true} angle={60} location={[0.5, 1]} style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={this._onSubmit}> 
                <Text style={styles.btText}>비밀번호 찾기</Text>
                </TouchableOpacity>
            </LinearGradient>
                <View style={{flexDirection: 'row', margin: 5, }}>
                <Text style={{fontStyle: 'italic', padding: 1, color: 'gray'}}>회원이 아니신가요? </Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Join')}><Text style={{marginLeft: 10, padding: 1}}>회원가입</Text></TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row',}}>
                 <Text style={{fontStyle: 'italic', padding: 1, color: 'gray'}}>처음으로 돌아가려면 </Text>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('Start')}><Text style={{marginLeft: 10, padding: 1}}>처음으로</Text></TouchableOpacity>
                </View>
        </View>
    );
  }
}

export class ResetPw extends Component {
    static defaultProps = {
        userid: "",
        _navigate: () => null,
    }

    constructor(props){
        super(props);
        this.state = {
            password: "",
            password2: "",
        }
    }

    _onReset=(_id)=>{
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
                console.log(_id);
                Alert.alert("비밀번호가 성공적으로 변경되었습니다.");
                this.props._navigate
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    render() {
        return (
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
                    <TouchableOpacity style={styles.button} onPress={()=>this._onReset(this.props.userid)}>
                    <Text style={styles.btText}>비밀번호 재설정</Text>
                    </TouchableOpacity>
                </LinearGradient>
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
