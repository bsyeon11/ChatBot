/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert, Button, Modal} from 'react-native';
import ModalPatch from './ModalPatch';

export default class ListScreen extends Component {
    state = {
        modalVisible: false,
        records: [],
        recordId: "",
    }

    componentDidMount() {
        fetch('http://10.0.2.2:4000/api/posts?username=edward', {  
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ 
                records: responseJson,
                modalVisible: this.state.modalVisible,
                recordId: this.state.recordId
             });
        })
        .catch((error) =>{
            Alert.alert("로그인 후 이용가능합니다.");
            this.props.navigation.navigate('Chat');
            console.error(error);
        });
    }

    _Delete(_id) {
        fetch('http://10.0.2.2:4000/api/posts/'+_id, {
            method: 'DELETE',
        })
        fetch('http://10.0.2.2:4000/api/posts?username=edward', {  
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ 
                records: responseJson,
                modalVisible: this.state.modalVisible,
                recordId: this.state.recordId
             });
        })
    }

    onToggle(_id) {
        this.setState({
          modalVisible: !this.state.modalVisible,
          records: this.state.records,
          recordId: _id,
        });
        console.log(_id);
      };

    render(){
        return (
            <ScrollView style={styles.container}>
                <Modal
                    animationType='fade'
                    visible={this.state.modalVisible}
                    transparent={true}
                >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}></View>
                </Modal>
                <ModalPatch
                    onPress={()=>this.onToggle("")}
                    recordId={this.state.recordId}
                    modalVisible={this.state.modalVisible}
                />
                {this.state.records.map((record, index) => (
                <TouchableOpacity key={index}
                    onPress={new Date(record.selected) > new Date() ? ()=>this.onToggle(record._id) : null}
                    disabled={new Date(record.selected) > new Date() ? false : true}
                    style={{
                        width: '100%',
                        marginBottom: 5,
                        borderBottomWidth: 0.5,
                        borderColor: 'gray',
                        padding: 10,
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        }}
                    >
                    <Text
                        style={{
                        fontSize: 15,
                        lineHeight: 28,
                        }}
                    >
                        예약구분 : {record.visited? "초진예약"+"\n" : "재진예약"+"\n"}
                        예약날짜 : {record.selected+"\n"}
                        예약시간 : {record.time+"\n"}
                        진료내용 : {record.symptom}
                    </Text>
                        <TouchableOpacity style={{
                            width: 20,
                            height: 20,
                            borderRadius: 2,
                            marginLeft: '90%',
                            backgroundColor: new Date(record.selected) > new Date() ? 'red': 'gray',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        disabled={new Date(record.selected) > new Date() ? false : true}
                        title={record._id}
                        onPress={()=>this._Delete(record._id)}
                        >
                            <Text style={{ color: 'white', fontSize: 15}}>X</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
