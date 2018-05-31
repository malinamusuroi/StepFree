import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  View
 } from 'react-native';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FROMtext: '',
      TOtext: '',
      result: ''
    };
  }

render() {
  return(

  <View style={styles.container}>

    <View style={styles.header}>
      <Text style={styles.headerText}>APP NAME TBD</Text>
    </View>

   <TextInput style={styles.FROMtext}
      placeholder="Enter Start:"
      onChangeText = {(FROMtext)=>this.setState({FROMtext})}/>

    <TextInput style={styles.TOtext}
      placeholder="Enter Destination:"
      onChangeText = {(TOtext)=>this.setState({TOtext})}/>

    <TouchableOpacity onPress= {() => this.search()} style = {styles.findButton}>
      <Text style = {styles.findButtonText}>FIND</Text>
    </TouchableOpacity>

    <ScrollView>
      <Text style={styles.text}> {this.state.result} </Text>
    </ScrollView>

    <TouchableOpacity onPress={this.refresh.bind(this)} style = {styles.refreshButton}>
      <Text style = {styles.refreshButtonText}>Clear</Text>
    </TouchableOpacity>

  </View>
)};

  search() {
    var origin1 = encodeURIComponent(this.state.FROMtext);
     var destination1 = encodeURIComponent(this.state.TOtext);
    fetch('https://safe-bastion-98845.herokuapp.com/getDirections?origin=' + origin1 +'&destination=' + destination1)    
    //fetch('http://localhost:3000/getDirections?origin=' + origin1 +'&destination=' + destination1)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        result: JSON.stringify(responseJson)
      });
  })
    .catch(function(error) {
    console.error('There has been a problem with your fetch operation: ' + error.message);
    });
  } 

  refresh() {
    alert(this.state.FROMtext + "\n"+ this.state.TOtext);
  }
  
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  header: {
    top: 10,
    backgroundColor:'#21abcd',
    alignItems: 'center',
    justifyContent:'center',
    height: 80,
  },
  headerText: {
    fontSize: 28,
    color:'white'
  },
  FROMtext: {
    top:10,
    //paddingTop: 50,
    fontSize: 20,
    color: 'black',
    height: 60,
 },
  TOtext: {
    fontSize: 20,
    color: 'black',
    height: 60, 
  },
  switchButtonText:{
    color: '#fff',
    fontSize: 28,
  },
  switchButton: {
    backgroundColor: '#21abcd',
    width: 40,
    height: 40,
    borderRadius: 15,
    start: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  
  findButton: {
    backgroundColor: '#21abcd',
    width: 70,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    //alignItems: 'center',
    alignSelf: 'flex-end',
    //top: -20,
    end: 10,

  },
  findButtonText: {
    color: '#fff',
    fontSize: 24
  },
  output:{
    flex: 1,
    alignSelf: 'center',
    top: -30,
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#21abcd',
    width: 70,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    end: 10,
    bottom: 10,
    marginTop: -20
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 24
  },
  text: {
    fontSize: 20,
  },
});
