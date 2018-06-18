import React, { Component } from 'react';
import {
	Alert,
  Image,
  StyleSheet,
  Text,
  View,
  InlineImage,
  SectionList,
	FlatList,
	TouchableOpacity
} from 'react-native';

export default class Routes extends Component{
  constructor(props) {
    super(props);
    this.state ={
      routes: '',
      routes2: '',
      bus: '',
			section: ''
    };
  }
  static navigationOptions = {
    title: 'Routes'
  };

	 render() {

    const { navigate } =  this.props.navigation;
	  const routes2 = this.props.navigation.state.params.routes2;
    const busRoutes = this.props.navigation.state.params.buses;
		const json = this.props.navigation.state.params.json
    json.routes = json.routes.sort(function (r1, r2) {
		   return parseInt(r1.duration.split(' ')[0]) - parseInt(r2.duration.split(' ')[0]);
		});
		json.bus = json.bus.sort(function (r1, r2) {
			 return parseInt(r1.duration.split(' ')[0]) - parseInt(r2.duration.split(' ')[0]);
		});
	  
		return (
    <View style = {styles.container}>
      <Image source = {require('./plainbackground.jpg')}
         style = {styles.background}>
      </Image>
		<SectionList
      renderItem={({item, index, section}) => 
			 <TouchableOpacity onPress={()=> {this.setState({section: section})
							         navigate('RouteInfo', {routes2: routes2[index], routes: json.routes[index], bus: busRoutes[index], section: section})}} 
							           underlayColor="white" style={styles.touchable}>
			  <View style={styles.button}>
          <Text style = {{color:'black', fontSize: 18, marginBottom: 7, marginTop: 4}}> {item.departureTime} - {item.arrivalTime}                            {item.duration} </Text>
          <View style = {{flexDirection: 'row', width: 360, flexWrap: 'wrap', marginBottom: 7, marginLeft: 8}}>{this.getSteps(item)}</View>
          <Text style = {styles.text}> {this.printStepFree(item.accessibility)} </Text>
        </View> 
        </TouchableOpacity>
			}
      renderSectionHeader={({section: {title}}) => (
			<View style={styles.sectionBox}>				
        <Text style={styles.sectionTitle}>{title}</Text>
			</View>
      )}
      sections={[
        {title: '  Step Free', data: json.bus},
        {title: '  Not Step Free', data: json.routes},
      ]}
      keyExtractor={(item, index) => item + index}
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
   return steps.map((step, index) => this.getRoute(step, index == steps.length - 1, index));
 }

 getRoute(json, isLast, key) {
   if (json.travelMode === 'WALKING') {
     const arrow = isLast ? null : <Image source = {require('./arrow.jpg')} style = {styles.arrow}/>
     return  <View key={key} style = {{flexDirection:'row'}}> 
              <Image source = {require('./wheel.png')} style = {styles.wheel}/>
              {arrow}
           </View>
   } else if (json.travelMode === 'TRANSIT') {
      const arrow = isLast ? null : <Image source = {require('./arrow.jpg')} style = {styles.arrow}/> 
        if (json.lineDetails.vehicle === 'SUBWAY') {
          return <View key={key} style = {{flexDirection:'row'}}>
                   <Image source ={require('./icon.jpg')} style = {styles.subway}/>
                   <View style = {{width: this.getLength(json.lineDetails.lineType), marginTop: 6, height: 20, alignItems: 'center', backgroundColor: this.getColor(json.lineDetails.lineType)}}>
                      <Text style = {{color: this.getStationColor(json.lineDetails.lineType)}}> {json.lineDetails.lineType} </Text>
                   </View>
                    {arrow}
                 </View>
      } else {
         const arrow = isLast ? null : <Image source = {require('./arrow.jpg')} style = {styles.arrow}/>
          return <View key={key} style = {{flexDirection: 'row'}}>
                   <Image source = {require('./busIcon.jpeg')} style = {styles.bus}/>
                   <Text> </Text>
                   <View style = {{backgroundColor: '#E32017', width: 33, height: 19, alignItems: 'center', marginTop: 8}}>
                     <Text style = {{color: 'white', fontSize: 15}}> {json.lineDetails.number} </Text>
                   </View> 
                  {arrow}
                </View>
      } 
   }
   return null;
 }

 getColor(station) {
   switch(station) {
      case 'Piccadilly':
         return '#003688'
         break;
      case 'Circle':
         return '#FFD300'
         break;
     case 'Central':
         return '#E32017'
         break;
    case 'Bakerloo':
        return '#B36305'
        break;
     case 'District':
        return '#00782A'
        break;
     case 'Northern':
        return '#1D2828'
        break;
    case 'Victoria':
        return '#0098D4'
        break;
    case 'Jubilee':
        return '#A0A5A9'
        break;
    case 'Waterloo and City':
        return '#95CDBA'
        break;
    case 'Hammersmith & City':
        return '#F3A9BB'
        break;
    case 'Metropolitan':
        return '#9B0056'
        break;
   }
 }

 getStationColor(station) {
   switch(station) {
     case 'Northern':
     case'Piccadilly':
     case 'District':
     case 'Central':
     case 'Bakerloo':
     case 'Metropolitan':
       return 'white'
       break;
     default:
       return 'black'
       break;
   }
 }

 getLength(station) {
   switch(station) {
     case 'Hammersmith & City':
     case 'Waterloo and City':
       return 137
       break;
     case 'Metropolitan':
       return 100
       break;
     case 'Piccadilly':
     case 'Northern':
       return 85
       break;
     default: 
       return 60
       break;
   }
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
    fontSize: 21,
    color: 'white',
    marginTop: 3
  },
  subway: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3
 },
  wheel: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  arrow: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  arrow2: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  bus: {
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    marginTop: 3
  },
  text: {
    marginLeft: 2,
    margin: 0,
    fontSize: 17,
    textAlign: 'left',
    marginBottom: 5
  },
  button: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: 'grey',
    marginBottom: 10,
	  width: 360,
    backgroundColor: 'white'
  },
  touchable: {
   marginLeft: 2	
	},
  sectionTitle: {  
   fontWeight: 'bold', 
   fontSize: 18, 
	},
	sectionBox: {
	 marginTop: 0,
   backgroundColor: '#f7f4f1',
	 borderBottomLeftRadius: 8,
	 borderWidth: 0.5,
	 borderColor: 'grey',
   borderBottomRightRadius: 8,
   borderTopLeftRadius: 8,
   borderTopRightRadius: 8,
	}
});
