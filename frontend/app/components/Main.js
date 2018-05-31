
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
 } from 'react-native';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FROMtext: '',
      TOtext: ''
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

    <TouchableOpacity onPress={this.switch.bind(this)} style = {styles.switchButton}>
      <Text style = {styles.switchButtonText}>↑↓</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={this.search.bind(this)} style = {styles.findButton}>
      <Text style = {styles.findButtonText}>FIND</Text>
    </TouchableOpacity>

    <ScrollView style={styles.output}>
      <Text style={styles.text}> HELLO </Text>
      <Text style={styles.text}> HELLO </Text>
   </ScrollView>

   <TouchableOpacity onPress={this.refresh.bind(this)} style = {styles.refreshButton}>
      <Text style = {styles.refreshButtonText}>Clear</Text>
    </TouchableOpacity>

  </View>
)};

  search() {
    if(this.state.TOtext&&this.state.FROMtext) {
     //alert(this.state.FROMtext + "\n"+ this.state.TOtext)
     alert("here")
    //  fetch('URL', {body : JSON.stringify({
    //   origin: this.state.FROMtext,
    //   destination: this.state.TOtext
    //   })
    // })
   } else {
    alert("Enter start and end destinations");
   }
  }

  switch() {
    if(this.state.TOtext&&this.state.FROMtext){
      var temp = this.state.FROMtext
      this.setState({FROMtext: this.state.TOtext}, () => console.log(this.state.FROMtext))
      this.setState({TOtext: temp},() => console.log(this.state.TOtext))
    }else {
      alert("Enter start and end destinations");
    }
  }

  refresh() {
    this.setState({FROMtext: ''},() => console.log(this.state.FROMtext))
    this.setState({TOtext: ''},() => console.log(this.state.TOtext))
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
    top: -40,
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
    fontSize: 100,
  }
});
