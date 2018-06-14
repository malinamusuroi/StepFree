import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


export default class Access extends Component{
  render() {
  	const { navigate } =  this.props.navigation;
    const routes = this.props.navigation.state.params.route
    const steps = routes.steps

   return(
 	    <View style = {styles.container}>
          <Image source = {require('./background2.jpeg')} style = {styles.image}/>
          <View style = {styles.view}>
             <Text> {this.getAccessibilityData(steps)} </Text>
          </View>
  	  </View>
  	);
  }

  getAccessibilityData(data) { 
    return data
      .filter(x => x.travelMode === "TRANSIT")
      .map(step => {
        return step.lineDetails.departureStop + "\n" + this.formatAccess(step.lineDetails.departureAccess) + "\n"
          step.lineDetails.arrivalStop + "\n" + this.formatAccess(step.lineDetails.arrivalAccess)
      }).join("\n")
  }

  formatAccess(data) {
    if (data.length > 0) {
      return "\tLift: " + data[0].lift + "\n" + this.formatLineInfo(data[0].lineInfo || []) 
    } else {
      return "\t Manual Ramp: Yes"
    }
  }

  formatLineInfo(lineInfo) {
    return lineInfo.map(info => {
      return "\t" + info.lineName + " (" + info.direction + " towards " + info.directionTowards + ")\n\t" +
      "Step: " + info.stepMin + "–" + info.stepMax + "cm\n\t" +
      "Gap: " + info.gapMin + "–" + info.gapMax + "cm\n"
    }).join("\n")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 415,
    height: 717,
    position: 'absolute', 
    resizeMode: 'cover'
  },
  view: {
    marginTop: 20,
    padding: 20,
    alignSelf: 'center',
     borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,

    backgroundColor: 'white'
  }
})
 
