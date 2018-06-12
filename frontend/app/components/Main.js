import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
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
      json: '',
      result2: ' ',
    };
  }

 render() {

  const {navigate} = this.props.navigation;

  return(
    <View style={styles.container}>
      <Image source = {require('./background.jpeg')}
            style = {styles.loginForm}>
      </Image>

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

      <TouchableOpacity onPress= {() => this.search(navigate)} style = {styles.findButton}>
        <Text style = {styles.findButtonText}>FIND ROUTE♿︎</Text>
      </TouchableOpacity>

    </View>
  )};

 search(nav) {
  const origin1 = encodeURIComponent(this.state.FROMtext);
  const destination1 = encodeURIComponent(this.state.TOtext);
//  fetch('https://safe-bastion-98845.herokuapp.com/getDirections?origin=' + origin1 +'&destination=' + destination1)    
   fetch('http://localhost:3000/getDirections?origin=' + origin1 +'&destination=' + destination1)
  .then((response) => response.json())
  .then((responseJson) => {
    var array =  responseJson.routes.map(route => {
      var steps = route.steps
      steps = steps.map(x => x.travelMode + ' - ' + x. durationOfStep + '\n  ' + x.instruction + '  ' + this.getLineDetails(x));
      return steps;
    })

     this.setState({
        result2: array,
        json: responseJson
     })
     nav('Routes', {json: this.state.json, routes2: this.state.result2})
     })
     .catch(function(error) {
    console.error('There has been a problem with your fetch operation: ' + error.message)
    });
  } 

 getLineDetails(json) {
   if (json.lineDetails == null) {
     return ' ';
   } else {
     return ('\n  Departure Stop: ' + json.lineDetails.departureStop + '\n  Arrival Stop: ' + json.lineDetails.arrivalStop + '\n  Number of stops: ' + json.lineDetails.numberOfStops) ;
   }
 }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  loginForm: {
    flex: 1,
    width: 415,
    height: 700,
    position: 'absolute', 
    resizeMode: 'cover'
  },
  headerText: {
    paddingLeft: 90,
    paddingTop: 50,
    fontSize: 40,
    color:'black'
  },
  headerText2: {
    paddingLeft: 130,
    paddingTop: 5,
    paddingBottom: 38,
    fontSize: 40,
    color: 'black',
  },
  FROMtext: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingLeft: 20,  
    paddingRight: 20,  
    margin: 16,  
    marginTop: 14,
    marginBottom: 8,
    fontSize: 16,
    borderColor: 'black',
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
    marginBottom: 40,
    fontSize: 16,
    borderColor: 'black',
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
});
