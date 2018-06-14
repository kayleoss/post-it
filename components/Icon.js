import React from 'react';
import { StyleSheet, TouchableHighlight, Image } from 'react-native';

const Icon = (props) => (
    <TouchableHighlight style={styles.homeAction} onPress={props.handlePageChange}>
        <Image source={props.img} style={styles.img}/>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    img: {
        width: 50,
        height: 50,
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: 'grey'
    },
    homeAction: {
    width: 95,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffdddd'
    },
})

export default Icon;