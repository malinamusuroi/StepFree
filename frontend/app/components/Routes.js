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
	  const routes2 = this.props.navigation.state.params.routes2;
    const json = this.props.navigation.state.params.json 

   return (
    <View style = {styles.container}>
      <Image source = {require('./background2.jpeg')}
         style = {styles.background}>
      </Image>

      <FlatList 
        data={json.routes} 
        keyExtractor={(r, i) => i + ''}
				renderItem={({item, index}) =>  
			  <TouchableOpacity onPress={()=> navigate('RouteInfo', {routes2: routes2[index]})} underlayColor="white" style={styles.touchable}>
			  <View style={styles.button}>
           <View>
              <Text style = {styles.text}>  {this.getSteps(item)} </Text>
           </View>
           <Text style = {styles.text}> Duration: {item.duration} </Text>
           <Text style = {styles.text}> {this.printStepFree(item.accessibility)}</Text>
        </View> 
        </TouchableOpacity>
        }
      />
    </View>
    );   
 }

 getSteps(route) {
    const steps = route.steps
    const info = this.getInfo(steps)
    return info;
 }
 
 getInfo(steps) {
   return steps.map(step => this.getRoute(step));
 }

 getRoute(json) {
   if (json.travelMode === 'WALKING') {
    return <View> 
              <Text style = {styles.text}>♿︎{json.durationOfStep} -></Text>
           </View>
   } else if (json.travelMode === 'TRANSIT') {
        if (json.lineDetails.vehicle === 'SUBWAY') {
          return <View>
                   <Text style = {styles.text} >🚊 {json.lineDetails.lineType}-></Text>
                 </View>
      } else {
          return <View>
                   <Text style = {styles.text}>🚌 {json.lineDetails.number} -></Text>
                 </View>
      } 
   }
   return null;
 }

 printStepFree(info) {
	 if (info.charAt(0) === 'N') {
	   return '❌' + info;
	 }
	 return '✅'  + info;
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
    margin: 0,
    fontSize: 20,
    textAlign: 'left'
  },
  button: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: 'black',
    marginBottom: 10,
	  width: 360,
    backgroundColor: 'white'
  },
  touchable: {
   marginLeft: 2	
	}
});
