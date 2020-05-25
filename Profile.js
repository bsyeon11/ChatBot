/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler'

export default class Profile extends Component {
    render(){
        return (
            <LinearGradient colors={['#3DB7CC' ,'#86E57F']} useAngle={true} angle={60} location={[0.5, 1]} style={styles.linearGradient}>
            <View style = {styles.container}>
                <Image source={require('./profile.png')} style={styles.profile}></Image>
                <View style = {styles.lightBox}>
                <Text style={styles.content}>안녕하세요. 스마트 챗봇입니다. 무엇이든 물어보세요 :)</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Chat')}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>질문하러 가기</Text>
                </TouchableOpacity>
                <Text style={{color: '#8C8C8C', fontWeight: 'bold'}}> Version 0.1.0 </Text>
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
        flex: 10,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 40,
    },
    profile: {
        height: 85,
        width: 90,
        marginBottom: 10,
    },
    content: {
        color: '#8C8C8C',
        marginBottom: 20,
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#8c8c8c',
        marginTop: 60,
    },
    lightBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBF7F8',
        padding: 30,
        height: '60%',
        width: '100%',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#3DB7CC',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        width: 250,
        height: 40,
        borderRadius: 15,
        marginBottom: 60,
    },
    logo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
