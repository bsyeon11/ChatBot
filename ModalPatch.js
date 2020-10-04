import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Alert, Modal} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import CheckBox from '@react-native-community/checkbox';
import Option from './Option';

export default class ModalPatch extends Component {
    static defaultProps = {
        modalVisible: false,
        recordId: "",
        onPress: () => null,
    }
    constructor(props){
        super(props);
    }
    state = {
        symptom: "",
        selected: "",
        visited: false,
        time: "오전 9시",
    }
    
    _Update = (_id) => {
        fetch('http://10.0.2.2:4000/api/posts/'+_id, {  
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                symptom: this.state.symptom,
                selected: this.state.selected,
                visited: this.state.visited,
                time: this.state.time,
                completed: true
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            Alert.alert("정상적으로 접수되었습니다.")
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    render() {
        return (
            <Modal
                animationType='slide'
                visible={this.props.modalVisible}
                transparent={true}
            >
            <ScrollView style={{ flex: 1, marginTop: 70, borderTopLeftRadius: 10, borderTopRightRadius: 10 ,padding: 10, backgroundColor: 'white'}}>
                <View style={{borderRadius: 10, backgroundColor: '#3DB7CC', padding: 10, marginBottom: 10, }}>
                    <Text style={{color: 'white'}}>* 안내사항 *</Text>
                    <Text style={{color: 'white'}}>예약시간에 병원에 오셔서 1층 접수처에 성명을 말씀해주세요. 빠른 진료 받으실 수 있도록 도와드리겠습니다.</Text>
                </View>
                <Text style={styles.title}>예약구분</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                <Text>  처음 방문이신가요?</Text>
                <CheckBox
                    value={this.state.visited}
                    onValueChange={()=>this.setState({visited: !this.state.visited})}
                />
                
                <Text
                    style={{marginHorizontal: 20, fontStyle: 'italic', color: '#3DB7CC'}}
                >{this.state.visited ? "초진예약" : "재진예약"}</Text>
                </View>
                <Text style={styles.title}>접수일자</Text>
                <Calendar
                    minDate={new Date()}
                    onDayPress={(day) =>this.setState({selected: day.dateString})}
                    markedDates={{
                        [this.state.selected]: {
                        selected: true,
                        marked: true,
                        selectedColor: '#3DB7CC',
                        selectedTextColor: 'white'
                    }
                }}
                />
                <Text style={styles.title}>예약시간</Text>
                <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Option
                    options={['오전 9시', '오전 10시', '오전 11시', '오후 12시', '오후 2시', '오후 3시', '오후 4시', '오후 5시']}
                    onChange={(option) => { this.setState({time: option})}}
                /></View>
                <Text style={styles.title}>접수내용</Text>
                <TextInput
                    placeholder="접수내용"
                    style={[styles.textinput, {borderWidth: 0.5}]}
                    onChangeText={(symptom)=>this.setState({symptom: symptom})}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30,}}>
                    <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                        <Text style={styles.btText}>돌아가기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={()=>this._Update(this.props.recordId)}>
                        <Text style={styles.btText}>수정하기</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        margin: 5,
    },
    textinput: {
      backgroundColor: 'white',
      height: 40,
      width: 250,
      fontSize: 14,
      margin: 3,
      paddingLeft: 15,
    },
    button: {
      margin: 10,
      marginHorizontal: 20,
      borderRadius: 20,
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3DB7CC'
    },
    btText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  