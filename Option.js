import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Alert, Modal} from 'react-native';

export default class Option extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeOption: this.props.options[0],
      };
    }
    updateActiveOption = (activeOption) => {
      this.setState({
        activeOption,
      });
    };
    render() {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: 300,
          }}
        >
          {this.props.options.map((option, index) => (
            <TouchableOpacity key={index}
              onPress={() => {
                this.props.onChange(option);
                this.updateActiveOption(option);
              }}
              style={{
                width: 50,
                height: 50,
                margin: 10,
                borderRadius: 20,
                padding: 5,
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: this.state.activeOption === option ? '#3DB7CC' : 'white'}}
            >
              <Text
                style={{
                  paddingLeft:5,
                  color: this.state.activeOption === option ? 'white' : 'black',
                  fontSize: 15,
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  }