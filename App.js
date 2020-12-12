// In App.js in a new project

import * as React from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import JoinScreen from './JoinScreen';
import ChatScreen from './ChatScreen';
import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import Profile from './Profile';
import ListScreen from './ListScreen';
import SettingScreen from './SettingScreen';
import ResetScreen from './ResetScreen';
import ResetPassword from './ResetPassword';
import Security from './Security';
import MyProfileScreen from './MyProfileScreen';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={StartScreen} options={{headerShown: false}}/>
        <Stack.Screen 
          name='Chat' 
          component={ChatScreen}
          options={({route, navigation}) => ({
            title: '공 릉 병 원',
            headerTintColor: '#3DB7CC', 
            headerTitleStyle: {
              fontSize: 18, 
              fontWeight: 'bold'
            },
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Image
              source={require('./setting.png')}
              style={styles.button}
          ></Image>
          </TouchableOpacity>),
          })}/>
        <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name='Join' component={JoinScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Reset' component={ResetScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Security' component={Security} 
            options={{title: '개인정보처리방침',
              headerTintColor: '#3DB7CC', 
              headerTitleStyle: {
              fontSize: 18, 
              fontWeight: 'bold'
            },
        }}/>
        <Stack.Screen name='ResetPassword' component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen 
          name='List' 
          component={ListScreen} 
          options={{
            title: '예 약 내 역',
            headerTintColor: '#3DB7CC', 
            headerTitleStyle: {
              fontSize: 18, 
              fontWeight: 'bold'
            },
          }}/>
          <Stack.Screen 
          name='Setting' 
          component={SettingScreen} 
          options={{
            title: '설 정',
            headerTintColor: '#3DB7CC', 
            headerTitleStyle: {
              fontSize: 18, 
              fontWeight: 'bold'
            },
          }}/>
          <Stack.Screen 
          name='MyProfileScreen' 
          component={MyProfileScreen} 
          options={{
            title: '프로필 수정',
            headerTintColor: '#3DB7CC', 
            headerTitleStyle: {
              fontSize: 18, 
              fontWeight: 'bold'
            },
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function settingButton() {
  return (
    <TouchableOpacity onPress={() => this.navigation.navigate('Setting')}>
      <Image
        source={require('./setting.png')}
        style={styles.button}
    ></Image>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;