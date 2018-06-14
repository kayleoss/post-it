import React from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class AddBug extends React.Component {
    state = {
        submitted: false,
        name: '',
        details: '',
        type: 'Choose type'
    }

    handleAddBug = () => {
        fetch('http://localhost:5000/addBug', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                details: this.state.details,
                type: this.state.type
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.message) {
                this.setState({submitted: true})
            } else {
                console.log(res);
            }
        })
    }
    
    render() {
        let data = [
            {
                value: 'urgent'
            },
            {
                value: 'critical'
            }
        ]
        if (this.state.submitted) {
            return (
                <View style={styles.page}>
                    <Text style={{color: 'green', fontSize: 20, paddingTop: 300}}>Successfully Created A Bug!</Text>
                    <TouchableHighlight style={styles.button} onPress={() => this.setState({submitted: false})}>
                        <Text style={{color: 'grey', fontSize: 15}}>
                            Submit Another?
                        </Text>
                    </TouchableHighlight>
                </View>
            )
        } else {
            return (
                <KeyboardAvoidingView style={styles.page} behavior="padding">
                    <Text style={{color: 'teal', fontSize: 35, paddingTop: 150, paddingBottom: 20, fontWeight: 'bold'}}>Add A Bug</Text>
                    <Text style={styles.label1}>Bug Name</Text>
                    <TextInput style={styles.input} onChange={(e) => this.setState({name: e.nativeEvent.text})}/>
                    <Text style={styles.label}>Bug Details</Text>
                    <TextInput style={styles.largeInput} onChange={(e) => this.setState({details: e.nativeEvent.text})} multiline={true}/>
                    <Dropdown 
                        value={this.state.type}
                        containerStyle={{ width: 200, height: 50, padding: 10, marginBottom: 20}} 
                        label="Bug Type" data={data} 
                        onChangeText={(e) => this.setState({type: e})}
                    />
                    <View style={{alignItems: 'center'}}>
                        <TouchableHighlight style={styles.button} onPress={this.handleAddBug}>
                            <Text style={{color: 'grey', fontSize: 15}}>Add Bug</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
            )
        }
    }
}
const styles = StyleSheet.create({
    page: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    label1: {
        color: 'grey',
        fontSize: 15,
        marginBottom: 10
    },
    label: {
        color: 'grey',
        fontSize: 15,
        marginTop: 20,
        marginBottom: 10
    },
    input: {
      width: 200,
      height: 40,
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#f7fdff',
      shadowColor: 'grey',
      shadowRadius: 1,
      shadowOpacity: 0.8,
      shadowOffset: {width:0, height: 0.5}
    },
    largeInput: {
      width: 200,
      height: 100,
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#f7fdff',
      shadowColor: 'grey',
      shadowRadius: 1,
      shadowOpacity: 0.8,
      shadowOffset: {width:0, height: 0.5}
    },
    button: {
        marginTop: 25,
        backgroundColor: '#ffdddd',
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        shadowColor: 'grey',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 10}
    }
})