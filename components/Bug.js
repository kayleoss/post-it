import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import moment from 'moment';

class Bug extends React.Component {
    render() {
        var date = this.props.dateCreated;
        var dateCreated = moment(date).format('DD-MM-YYYY hh:ssA');
        return (
            <View style={styles.bug}>
                <Text style={{color: this.props.color, fontSize: 20}}>{this.props.name}</Text>
                <Text style={styles.date}>{dateCreated}</Text>
                <Text style={styles.details}>{this.props.details}</Text>
                {!this.props.completed ? 
                <TouchableHighlight style={styles.button} onPress={() => this.props.handleCompletion(this.props.id)}>
                    <Text style={styles.small}>Mark Fixed</Text>
                </TouchableHighlight> : <View></View>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bug: {
        width: 300,
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7fdff'
    },
    small: {
        color: 'grey',
        fontSize: 15
    },
    details: {
        color: 'grey',
        fontSize: 15
    },
    button: {
        marginTop: 10,
        width: 200,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#ffdddd',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    date: {
        fontSize: 17,
        color: '#4d808e'
    }
})

export default Bug;