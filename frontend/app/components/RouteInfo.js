import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';


export default class RouteInfo extends Component{
  render() {
  	const { navigate } =  this.props.navigation;
    const routes = this.props.navigation.state.params.routes2

   return(
 	    <View style = {styles.container}>
  	  	   <Image source = {require('./background2.jpeg')}
             style = {styles.background}>
           </Image>
         <View style = {styles.button}>
            <Text style = {styles.text}> {JSON.stringify(routes)} </Text>
         </View>
  	  </View>
  	);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: 415, 
    height: 715,
    position: 'absolute',
    resizeMode: 'cover'
  },
  button: {
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
  	textAlign: 'left',
    borderColor: 'black',
    fontSize: 20
  }
});
