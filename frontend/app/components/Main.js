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

// asks for the content
  search() {
     var origin1 = encodeURIComponent(this.state.FROMtext);
     var destination1 = encodeURIComponent(this.state.TOtext);
    
    fetch('https://safe-bastion-98845.herokuapp.com/getDirections?origin=' + origin1 +'&destination=' + destination1)
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
  FROMtext: {
    paddingTop: 50,
    fontSize: 20,
    color: 'black',

  },
  TOtext: {
    fontSize: 20,
    color: 'black',

  },
  findButton: {
    backgroundColor: '#21abcd',
    width: 70,
    height: 70,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    end: 10,
    top: 10,

  },
  findButtonText: {
    color: '#fff',
    fontSize: 24
  },
  refreshButton: {
    backgroundColor: '#21abcd',
    width: 70,
    height: 70,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    end: 10,
    bottom: 10,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 24
  },
  text: {
    fontSize: 20,
  }
});
