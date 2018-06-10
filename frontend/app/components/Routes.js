import React, { Component } from 'react';
import {
	Alert,
  Image,
  StyleSheet,
  Text,
  View,
  InlineImage,
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
              <Text style = {styles.text}>{this.getSteps(item)} </Text>
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
   return steps.map((step, index) => this.getRoute(step, index == steps.length - 1));
 }

 getRoute(json, isLast) {
   if (json.travelMode === 'WALKING') {
     const arrow = isLast ? null : <Image source = {require('./arrow.jpg')} style = {styles.arrow}/>
     return <View style = {{flexDirection:'row'}}> 
              <Image source = {require('./wheel.png')} style = {styles.wheel}/>
              {arrow}
           </View>
   } else if (json.travelMode === 'TRANSIT') {
      const arrow = isLast ? null : <Image source = {require('./arrow.jpg')} style = {styles.arrow2}/> 
        if (json.lineDetails.vehicle === 'SUBWAY') {
          return <View style = {{flexDirection:'row'}}>
                   <Image source ={require('./icon.jpg')} style = {styles.subway}/>
                   <Text style = {styles.text2} > {json.lineDetails.lineType} </Text>
                    {arrow}
                 </View>
      } else {
         const arrow = isLast ? null : <Image source = {require('./arrow.jpg')} style = {styles.arrow2}/>
          return <View style = {{flexDirection: 'row'}}>
                   <Image source = {require('./busIcon.jpeg')} style = {styles.bus}/>
                   <Text style = {styles.text2}> ({json.lineDetails.number}) </Text>
                   {arrow}
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
  text2: {
    fontSize: 16,
    color: 'black',
    marginTop: 2
  },
  subway: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3
 },
  wheel: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2
  },
  arrow: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -1
  },
  arrow2: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  bus: {
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 18,
    marginTop: 3
  },
  text: {
    marginLeft: 2,
    margin: 0,
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 0
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
