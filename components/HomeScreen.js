import React from 'react';
import { ImageBackground, View, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: "Post It",
      headerStyle: {
        backgroundColor: '#ffdddd',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'grey',
        paddingTop: 7,
        fontFamily: 'AmericanTypewriter-Bold'
      },
    }
  
    state = {
      username: '',
      password: '',
      userId: '',
      error: ''
    }
  
    handleUsername = (e) => {
      this.setState({username: e.nativeEvent.text.toLowerCase()});
    }
  
    handlePass = (e) => {
      this.setState({password: e.nativeEvent.text});
    }
  
    handleLogin = (e) => {
        fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        })
        .then(res => res.json())
        .then(res => {
          if (!res.error) {
            this.props.navigation.navigate('Urgent', {user: res.user});
          } else {
            this.setState({error: res.error})
          }
        })
    }
  
    render() {
      return (
        <ImageBackground style={styles.container2} source={require('../assets/background.jpg')}>
            {this.state.error !== '' ? <Text style={styles.errorMessage}>{this.state.error}</Text> : <View></View>}
            <Text style={{color: 'grey', marginBottom: 5}}>Username</Text>
            <TextInput style={styles.input} onChange={this.handleUsername}/>
            <Text style={{color: 'grey', marginTop: 20, marginBottom: 5}}>Password</Text>
            <TextInput style={styles.input} secureTextEntry={true} onChange={this.handlePass}/>
            <TouchableHighlight style={styles.button} onPress={this.handleLogin}>
                <Text style={styles.p}>Login</Text>
            </TouchableHighlight>
        </ImageBackground>
      )
    }
  }

  const styles = StyleSheet.create({
    container2: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    p: {
      fontSize: 15,
      color: 'grey',
      textAlign: 'center'
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
    },
    errorMessage: {
      fontSize: 12,
      color: 'red',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 20
    }
  });