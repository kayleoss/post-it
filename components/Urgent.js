import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';

import NavBottom from './NavBottom';
import Bug from './Bug';
import AddBug from './AddBug';

export default class Urgent extends React.Component {
    static navigationOptions = {
      title: "Urgent",
      header: () => {
      }
    }
  
    state = {
      page: 'home',
      bugs: [],
      color: ''
    }
  
    handleUrgent = () => {
      fetch('http://localhost:5000/bugs/urgent', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        this.setState({ bugs: [], color: 'red', page: 'urgent' });
        res.map(bug => {
          this.setState({ bugs: [...this.state.bugs, bug]});
        })
      })
    }
  
    handleBugs = () => {
      fetch('http://localhost:5000/bugs/critical', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        this.setState({ bugs: [], color: 'orange', page: 'critical' });
        res.map(bug => {
          this.setState({ bugs: [...this.state.bugs, bug]});
        })
      })
    }
  
    handleCompleted = () => {
      fetch('http://localhost:5000/completedbugs', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
          this.setState({page: 'completed', bugs: [], color: 'green'});
          res.map(bug => {
              this.setState({bugs: [...this.state.bugs, bug]})
          })
      })
    }
  
    handleBugCompletion = (id) => {
  
      fetch('http://localhost:5000/markcomplete/' + id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  
      fetch('http://localhost:5000/bugs/' + this.state.page, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        this.setState({bugs: []})
        res.map(bug => {
          this.setState({ bugs: [...this.state.bugs, bug]});
        })
      })
      
    }
  
    render() {
      let page;
  
      switch (this.state.page) {
        case 'home':
          page = 
          <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
            <Text style={{color: '#2c7387', fontSize: 25, fontWeight: 'bold', textAlign:'center', marginTop: 150, fontFamily: 'AmericanTypewriter-Bold'}}>Post-It</Text>
            <Text style={{color: 'grey', fontSize: 20, textAlign: 'center', paddingLeft: 30, paddingRight: 30}}>select URGENT or CRITICAL icons below to view bugs of that type.</Text>
            <Text style={{color: 'grey', fontSize: 20, textAlign: 'center', paddingLeft: 30, paddingRight: 30}}>select FIXED to view fixed bugs</Text>
            <Text style={{color: 'grey', fontSize: 20, textAlign: 'center', paddingLeft: 30, paddingRight: 30}}>select ADD to add a new bug</Text>
          </View>
          break;
        case 'urgent':
          page = 
          <View style={styles.page}>
            <Text style={styles.h1}>urgent</Text>
            <Text style={styles.p}>fix em now!!!!</Text>
          </View>
          break;
        case 'critical':
          page = 
          <View style={styles.page}>
            <Text style={styles.h1Orange}>critical</Text>
            <Text style={styles.p}>preeetty important</Text>
          </View>
          break;
        case 'completed':
          page =  
            <View style={styles.page}>
                <Text style={styles.h1Green}>completed/fixed</Text>
                <Text style={styles.p}>good job!</Text>
            </View>
            break;
        case 'add':
          page = 
          <AddBug />
          break;
      }
  
      return (
        <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
          {page}
          <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, alignItems: 'center', paddingBottom: '10%'}}>
          {this.state.page !== 'add' ? this.state.bugs.map(b => {
                return <Bug 
                  key={b._id} 
                  id={b._id}
                  name={b.name} 
                  details={b.details} 
                  completed={b.completed} 
                  color={this.state.color}
                  dateCreated={b.dateCreated}
                  handleCompletion={this.handleBugCompletion}
                />
                
              }) : <View></View>}
          </ScrollView>
          
          <NavBottom 
            changePageUrgent = {this.handleUrgent}
            changePageBugs = {this.handleBugs}
            changePageCompleted = {this.handleCompleted}
            changePageAddBug = {() => this.setState({page: 'add'})}
          />
        </ImageBackground>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container2: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    h1: {
      fontSize: 40,
      textAlign: 'center',
      marginTop: 60,
      color: 'red'
    },
    h1Orange: {
      fontSize: 40,
      textAlign: 'center',
      marginTop: 60,
      color: 'orange'
    },
    h1Green: {
      fontSize: 40,
      textAlign: 'center',
      marginTop: 60,
      color: 'green'
    },
    p: {
      fontSize: 15,
      color: 'grey',
      textAlign: 'center'
    },
    page: {
      height: 150,
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