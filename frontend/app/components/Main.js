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
      <Text style={styles.headerText}>EMPOWER </Text>
    </View>
    <View style = {styles.header}>
    <Text style={styles.headerText2}>MOVEMENT</Text>
    </View>

   <TextInput style={styles.FROMtext}
      placeholder="Enter Start"
      onChangeText = {(FROMtext)=>this.setState({FROMtext})}/>

    <TextInput style={styles.TOtext}
      placeholder="Enter Destination"
      onChangeText = {(TOtext)=>this.setState({TOtext})}/>

    <TouchableOpacity onPress= {() => this.search()} style = {styles.findButton}>
      <Text style = {styles.findButtonText}>FIND ROUTE♿︎
      </Text>
    </TouchableOpacity>

    <ScrollView>
        <Text style={styles.text}> {this.state.result} </Text>
    </ScrollView>

  </View>
)};

  search() {
    var origin1 = encodeURIComponent(this.state.FROMtext);
     var destination1 = encodeURIComponent(this.state.TOtext);
    fetch('https://safe-bastion-98845.herokuapp.com/getDirections?origin=' + origin1 +'&destination=' + destination1)    
    //fetch('http://localhost:3000/getDirections?origin=' + origin1 +'&destination=' + destination1)
    .then((response) => response.json())
    .then((responseJson) => {
      var leg = JSON.stringify(responseJson.legs).slice(1,-1).split("\",")
      var leg_str = ''
      for (i=0; i<leg.length; i++){
        var count = i+1
        leg_str+=count + " : " + leg[i].slice(1)+"\n"
      }
      this.setState({
        result: "Estimated Duration: " + JSON.stringify(responseJson.duration).slice(1,-1) + "\n\nSteps:\n" + leg_str.slice(0,-2)
      });
  })
    .catch(function(error) {
    console.error('There has been a problem with your fetch operation: ' + error.message);
    });
  } 
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  headerText: {
    paddingLeft: 45,
    paddingTop: 50,
    fontSize: 40,
    color:'black'
  },
  headerText2: {
    paddingLeft: 100,
    paddingTop: 5,
    paddingBottom: 14,
    fontSize: 40,
    color: 'black',
    //alignSelf: 'center'
  },
  FROMtext: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 16,  
    margin: 16,  
    marginTop: 14,
    marginBottom: 8,
    fontSize: 16,
    borderColor: 'gray',
    color: 'black',
    height: 50,
 },
  TOtext: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 16,  
    margin: 16,
    marginTop: 8,
    marginBottom: 20,
    fontSize: 16,
    borderColor: 'gray',
    color: 'black',
    height: 50, 
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
    width: 200,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
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
    width: 90,
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
    padding: 12,
    paddingTop: 20,
    fontSize: 20,
    color: 'black',
    justifyContent: 'center',
  },
});
