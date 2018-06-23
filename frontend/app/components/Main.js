import React, { Component } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Navigator,
  Geolocation,
  View
 } from 'react-native';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FROMtext: '',
      TOtext: '',
      json: '',
      busResult:'',
			result2: ' ',
      isTimePickerVisible: false,
      departureTime: '',
      departureText: 'Now' 
    };
  }

 render() {
   const {navigate} = this.props.navigation;

 return(
    <View style={styles.container}>
      <Image source = {require('./backgroundLogo.jpeg')}
            style = {styles.backgroundImage}>
      </Image>

      <TouchableOpacity onPress={this.displayTimePicker}  style = {styles.timePickButton}>
        <Text style= {styles.timePickButtonText}>Depart {this.state.departureText}  ▼  </Text>
      </TouchableOpacity>

      <TextInput style={styles.FROMtext}
        clearButtonMode='always'
        placeholder="Enter Start"
        value={this.state.useCurrentLocation ? "Using Current Location" : this.state.FROMtext}
        onChangeText = {(FROMtext)=>this.setState({FROMtext: FROMtext, useCurrentLocation: false})}/>

       <TouchableOpacity onPress = {() => this.getCurrentLoc()}> 
         <Image source = {require('./loc.png')} style = {styles.currentLocIcon}/>
       </TouchableOpacity>

      <TextInput style={styles.TOtext}
        placeholder="Enter Destination"
        clearButtonMode='always'
        value={this.state.TOtext}
        onChangeText = {(TOtext)=>this.setState({TOtext})}/>

      <TouchableOpacity onPress= {() => this.search(navigate)} style = {styles.findButton}>
        <Text style = {styles.findButtonText}> FIND ROUTE ♿︎ </Text>
      </TouchableOpacity>
          
      <DateTimePicker
        isVisible={this.state.isTimePickerVisible}
        onConfirm={this.onTimePickPress}
        onCancel={this.hideTimePicker}
        mode= 'datetime'
        titleIOS= 'Pick a departure time'
      />
    </View>
 )}

 getCurrentLoc() {
    navigator.geolocation.getCurrentPosition((m) => this.geo_success(m))
 }

 geo_success(m) {
   this.setState( {
     FROMtext: m.coords.latitude + ',' + m.coords.longitude,
     useCurrentLocation: true
   })
 }

 clear() {
   this.setState({
     useCurrentLocation: false,
     FROMtext: '',
     TOtext: '',
    });
 }

 search(nav) {
  const londonText = this.state.useCurrentLocation ? '' : ', London';
  const origin1 = encodeURIComponent(this.state.FROMtext + londonText);
  const destination1 = encodeURIComponent(this.state.TOtext + ', London');
  const departureTime1 = encodeURIComponent(this.state.departureTime);
  fetch('https://safe-bastion-98845.herokuapp.com/getDirections?origin=' + origin1 +'&destination=' + destination1 + '&departure_time=' + departureTime1)    
  //fetch('http://localhost:3000/getDirections?origin=' + origin1 +'&destination=' + destination1 + '&departure_time=' + departureTime1)
  .then((response) => response.json())
  .then((responseJson) => {
    const routeDescriptions = this.formatRoutes(responseJson.routes)
    const busRouteDescriptions = this.formatRoutes(responseJson.bus)

    this.setState({
      busRouteDescriptions: busRouteDescriptions,
      routeDescriptions: routeDescriptions,
      routeContext: responseJson
    })
    nav('Routes', {routeContext: this.state.routeContext, routeDescriptions: this.state.routeDescriptions, busRouteDescriptions: this.state.busRouteDescriptions})
  })
  .catch(function(error) {
    console.error('There has been a problem with your fetch operation: ' + error.message)
  });
 } 

 displayTimePicker = () => this.setState({ isTimePickerVisible: true });
 hideTimePicker = () => this.setState({ isTimePickerVisible: false });
 onTimePickPress = (date) => {
   this.setState({ departureTime: date.getTime()/1000 });
   this.setState({ departureText: 'at ' + date.toLocaleTimeString('en-US') });
   this.hideTimePicker();
 };

 formatRoutes(routes) {
   return routes.map(route => {
    return route.steps.map(step => {
      return step.travelMode + ' - ' + step.durationOfStep + '\n  ' + step.instruction + '  ' + this.getLineDetails(step);
    })
   })
 }

 getLineDetails(json) {
   if (json.lineDetails == null) {
     return ' ';
   } else {
     return ('\n  Departure Stop: ' + json.lineDetails.departureStop + 
             '\n  Arrival Stop: ' + json.lineDetails.arrivalStop + 
             '\n  Number of stops: ' + json.lineDetails.numberOfStops +
             '\n  Line: ' + json.lineDetails.lineType) 
   }
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: 415,
    height: 700,
    position: 'absolute', 
    resizeMode: 'cover'
  },
  FROMtext: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingLeft: 20,  
    paddingRight: 20,  
    margin: 16,  
    marginTop: 14,
    marginBottom: 8,
    fontSize: 16,
    borderColor: 'rgba(52, 52, 52, 0.7)',
    color: 'black',
    height: 50,
 },
  currentLocIcon: {
    position: 'absolute',
    width: 25, 
	  height: 25,
    marginLeft: 314,
    marginTop: -47
  },
  TOtext: {
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 16,  
    margin: 16,
    marginTop: 8,
    marginBottom: 40,
    fontSize: 16,
    borderColor: 'rgba(52, 52, 52, 0.5)',
    color: 'black',
    height: 50, 
  },
  findButton: {
    backgroundColor: '#21abcd',
    width: 200,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    end: 10,
  },
  findButtonText: {
    color: '#fff',
    fontSize: 24
  },
  timePickButton: {
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    height: 35,	
    width: 350,
    borderRadius: 30,
    marginTop: 190,
    alignItems: 'center',
    justifyContent: 'center',
    start: 10
  },
  timePickButtonText: {
    fontSize: 17,
    paddingLeft: 10,
  },
});
