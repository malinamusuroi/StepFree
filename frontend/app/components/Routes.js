import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';



export default class Routes extends Component{
  render() {

    const { navigate } =  this.props.navigation;
    const routes = this.props.navigation.state.params.routes

    return (
      <View style = {styles.container}>
        <Text>{routes}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});