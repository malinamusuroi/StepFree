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

  return(
 	    <View style = {styles.container}>
  		   <Image source = {require('./background2.jpeg')}
            style = {styles.background}>
         </Image>
        <Text style = {styles.text}>Navigated here </Text>
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
  text: {
  	textAlign: 'left',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 20
  }
});
