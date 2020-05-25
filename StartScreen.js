import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler'

export default class StartScreen extends Component {
  state = {
    animation: new Animated.Value(0)
  }

  clkLogin() {
    return (
      <View style={{flex: 1}}>
        <Text>hi</Text>
      </View>
    )
  }

  componentDidMount() {
    Animated.timing(
      this.state.animation,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start();
  }

  render() {
    const animationStyles = {
      opacity: this.state.animation
    };

    return (
        <View style={styles.container}>
        <Animated.View style={[styles.content, animationStyles]}>
          <Text style={styles.title}>당신의</Text>
          <Text style={[styles.title, {color: '#3DB7CC'}]}>똑똑한</Text>
          <Text style={styles.title}>온라인 닥터</Text>
        </Animated.View>
        <View style={styles.footer}>
          
        <LinearGradient colors={['#3DB7CC' ,'#86E57F']} useAngle={true} angle={60} location={[0.5, 1]} style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Login')}>
            <Text style={styles.btText}>로그인</Text>
            </TouchableOpacity>
          </LinearGradient>
          
          <LinearGradient colors={['#3DB7CC' ,'#86E57F']} useAngle={true} angle={60} location={[0.5, 1]} style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Chat')}>
            <Text style={styles.btText}>로그인없이 계속</Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={{flexDirection: 'row', margin: 10, }}>
          <Text style={{fontStyle: 'italic', padding: 1, color: 'gray'}}>회원이 아니신가요? </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Join')}><Text style={{marginLeft: 10, padding: 1}}>회원가입</Text></TouchableOpacity>
          </View>
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
  title: {
    fontSize: 45,
    color: '#8c8c8c',
  },
  content: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  footer: {
    flex: 5,
    alignItems: 'center',
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
  }

});
