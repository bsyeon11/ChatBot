import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal } from 'react-native';
import { GiftedChat, Send, InputToolbar, SystemMessage, Bubble, MessageImage, } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies';
import { dialogflowConfig } from './env';
import ModalPost from './ModalPost';

const BOT_USER = {
  _id: 2,
  name: 'Smart Bot',
  avatar: require('./profile.png'),
};

const IMAGES = {
  medical: {
    uri: require('./medical.jpg'),
  },
}

class ChatScreen extends Component {

  state = {
    modalVisible: false,
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
              title: '진료시간',
              value: '진료시간',
              messageId : 1
            },
            {
              title: '진료예약',
              value: '진료예약',
              messageId : 1
            },
            {
              title: '예약확인',
              value: '예약확인',
              messageId : 1
            },
          ],
        },
      },
     {
        _id: 2,
        text: '응급상황 발생 시 119에 연락하세요.',
        createdAt: new Date(),
        user: BOT_USER,
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
      modalVisible: previousState.modalVisible,
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  onToggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      messages: this.state.messages
    });
  };

  onQuickReply(replies = []) {
    let reply = replies[0].value;
    let msg = {
      _id: this.state.messages.length + 1,
      text: reply,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };
    if(reply=='진료예약') {
      this.onToggle();
    }
    else if(reply=='예약확인') {
      this.props.navigation.navigate('List');
    }
    else if(reply=='설정') {
      this.props.navigation.navigate('Setting');
    }
    else {
      this.onSend([msg])
    }
  }
  
  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };

    this.setState(previousState => ({
      modalVisible: previousState.modalVisible,
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
      <View style={{ flex: 1, backgroundColor: '#FBF7F8'}}>
        <Modal
          animationType='fade'
          visible={this.state.modalVisible}
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}></View>
        </Modal>
        <ModalPost
          onPress={this.onToggle}
          modalVisible={this.state.modalVisible}
        />
        <View style={{flex:11}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderQuickReplies={(props) => <QuickReplies color='white' {...props} />}
          onQuickReply={replies => this.onQuickReply(replies)}
          showAvatarForEveryMessage={true}
          alwaysShowSend={true}
          alignTop={true}
          placeholder='메시지를 입력하세요'
          maxInputLength={100}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          renderAvatarOnTop={true}
          renderInputToolbar={this.renderInputToolBar}
          quickReplyStyle={{backgroundColor: /*'#2c3e50'*/'gray', borderRadius: 20, height: 40, width: 80, margin: 2, marginTop: 5}}
          user={{
            _id: 1
          }}
        />      
        </View>
      </View>
    );
  }
}

export default ChatScreen;
