import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';


export default class RouteInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      route:''
    };
  }
  render() {
  	const { navigate } =  this.props.navigation;
    const routes = this.props.navigation.state.params.routes2;
    const rout = this.props.navigation.state.params.routes

   return(
 	    <View style = {styles.container}>
  	  	   <Image source = {require('./background2.jpeg')}
             style = {styles.background}>
           </Image>
        <TouchableOpacity onPress = {() => navigate('Access', {route: rout})} style = {styles.button}>
            <Text style = {styles.text}> {routes.join("\n\n")} </Text>
        </TouchableOpacity>
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
    height: 717,
    position: 'absolute',
    resizeMode: 'cover'
  },
  button: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12
  },
  text: {
    margin: 5,
    color: 'black',
  	textAlign: 'left',
    borderColor: 'black',
    fontSize: 18
  }
});
