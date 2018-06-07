import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';



export default class RouteInfo extends Component{
  render() {
  	const { navigate } =  this.props.navigation;
  	return(
 	<View style = {styles.container}>
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
  text: {
  	textAlign: 'left',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 20
  }
});