import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class Access extends Component{
  render() {
  	const { navigate } =  this.props.navigation;

   return(
 	    <View style = {styles.container}>
					 <Text>Navigated Here</Text>
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
})
 
