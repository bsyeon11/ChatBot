/*import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code }</NavigationContainer>
  );
}
*/
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { GiftedChat, Send, InputToolbar, SystemMessage, Bubble  } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies';

const BOT_USER = {
  _id: 2,
  name: 'Smart Bot',
  avatar: 'string', 
};

const REPLY = {
  type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: '진료예약',
              value: '진료예약',
              messageId : 1
            },
            {
              title: '예약변경 및 취소',
              value: '예약확인',
              messageId : 1
            },
          ]
}

class App extends Component {

  state = {
    messages: [
      {
        _id: 1,
        text: '안녕하세요. 공릉병원 스마트봇입니다. 무엇을 도와드릴까요?',
        createdAt: new Date(),
        user: BOT_USER,
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: '병원소개',
              value: '병원소개',
              messageId : 1
            },
            {
              title: '진료안내',
              value: '진료안내',
              messageId : 1
            },
            {
              title: '진료예약',
              value: '진료예약',
              messageId : 1
            },
          ],
        },
      },
     {
        _id: 2,
        text: '응급상황 발생 시 119에 연락하세요.',
        createdAt: new Date(),
        system: true
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_KOREAN,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  onQuickReply(replies = []) {
    let reply = replies[0].value;
    Dialogflow_V2.requestQuery(
      reply,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }
  
  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    //  quickReplies: REPLY,
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  renderSend(props) {
    return (
        <Send
            {...props}
        >
            <View style={{marginRight: 5, marginStart: 4, marginBottom: 5}}>
                <Image style={{width: 35, height: 35 }}source={require('./send.png')} resizeMode={'center'}/>
            </View> 
        </Send>
    );
  }

  renderInputToolBar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#FBF7F8',
          borderColor: 'gray',
          borderWidth: 0.5,
          borderRadius: 25,
          marginBottom: 5,
          paddingTop: 5,
          marginHorizontal: 5,
        }}
      >
      </InputToolbar>
    );
  }
  
/*  renderSystemMessage() {
      return (
        <SystemMessage
          {...props}
          wrapperStyle={styles.systemMessageWrapper}
          textStyle={styles.systemMessageText}
        />
      );
  }

  renderQuickReply(props) {
    return (
      <QuickReplies {...props}
        color='white'
      >
      </QuickReplies>
    )
  }
*/
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#3DB7CC'
          }
        }}
        textStyle={{
          right: {
            color: '#fff',
            fontSize: 15,
          },
          left: {
            fontSize: 15,
          }
        }}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FBF7F8' }}>
        <View style={{height: 50, borderBottomColor: '#bdbdbd', borderBottomWidth: 1, flexDirection:'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={null} style={{alignItems: 'flex-start', flex: 1, marginHorizontal: 20 }}>
                <Image style={{height: 20, width: 30}} source={require('./back.png')}></Image>
            </TouchableOpacity>
          <View sytle={{flex: 1}}><Text style={{color: '#3DB7CC', fontSize: 18, fontWeight: 'bold'}}>공 릉 병 원</Text></View>
          <TouchableOpacity onPress={null} style={{alignItems: 'flex-end', flex: 1, marginHorizontal: 20 }}>
                <Image style={{height: 15, width: 20}} source={require('./list.png')}></Image>
            </TouchableOpacity>
        </View>
        <View style={{flex:11}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          onQuickReply={replies => this.onQuickReply(replies)}
          showAvatarForEveryMessage={true}
          alwaysShowSend={true}
          alignTop={true}
          placeholder='메시지를 입력하세요'
          maxInputLength={100}
          //renderSystemMessage={this.renderSystemMessage}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          renderAvatarOnTop={true}
          renderInputToolbar={this.renderInputToolBar}
      //    renderQuickReply={(props) => <QuickReplies color='#fff' {...props} />}
          user={{
            _id: 1
          }}
        />
        </View>
      </View>
    );
  }
}

export default App;
