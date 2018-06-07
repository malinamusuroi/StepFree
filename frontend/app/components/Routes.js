import React, { Component } from 'react';
import {
	Alert,
  StyleSheet,
  Text,
  View,
	FlatList,
	TouchableHighlight
} from 'react-native';

export default class Routes extends Component{
   _onPressButton() {
  
	 } 
	 
	 render() {

    const { navigate } =  this.props.navigation;
    const routes = this.props.navigation.state.params.routes
    
		return (
      <View style = {styles.container}>
			<FlatList
				data={routes} 
				renderItem={({item}) =>  
			  <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
					<View style={styles.button}>
            <Text style= {styles.text}>{item}</Text>
          </View> 
        </TouchableHighlight>
        }
			/>
      </View>
		);
	 }
}

const styles = StyleSheet.create({
  container: {
		paddingTop: 30,
		flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
		color: 'black'
  },
  button: {
    marginBottom: 30,
		width: 330,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  }
});
