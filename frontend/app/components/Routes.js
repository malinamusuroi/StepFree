import React, { Component } from 'react';
import {
	Alert,
  Image,
  StyleSheet,
  Text,
  View,
	FlatList,
	TouchableOpacity
} from 'react-native';

export default class Routes extends Component{
  constructor(props) {
    super(props);
    this.state ={
      routes: '',
      routes2: ''
    };
  }
  static navigationOptions = {
    title: 'Routes'
  };

   _onPressButton() {
  
	 } 

	 render() {

    const { navigate } =  this.props.navigation;
    const routes = this.props.navigation.state.params.routes;
	  const routes2 = this.props.navigation.state.params.routes2
     
   return (
    <View style = {styles.container}>
      <Image source = {require('./background2.jpeg')}
         style = {styles.background}>
      </Image>

      <FlatList 
        data={routes} 
        keyExtractor={(r, i) => i + ''}
				renderItem={({item, index}) =>  
			  <TouchableOpacity onPress={()=> navigate('RouteInfo', {routes2: routes2[index]})} underlayColor="white" style={styles.touchable}>
					<View style={styles.button}>
            <Text style= {styles.text}>{item}</Text>
          </View> 
         </TouchableOpacity>
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
  background: {
    flex: 1,
    width: 415,
    height: 715,
    position: 'absolute',
    resizeMode: 'cover'
  },
  text: {
    marginLeft: 2,
    margin: 8,
    fontSize: 20
  },
  button: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: 'black',
    marginBottom: 10,
	  width: 340,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  touchable: {
   marginLeft: 2	
	}
});
