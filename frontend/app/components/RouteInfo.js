import React, { Component } from 'react';
import Dash from 'react-native-dash';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';


export default class RouteInfo extends Component{
  
  static navigationOptions = {
    title: 'Route Details'
  };

  render() {
    const { navigate } =  this.props.navigation;
    const routes = this.props.navigation.state.params.routes2

    return(
      <View style = {styles.container}>
        <Image source = {require('./background2.jpeg')}
        style = {styles.background}>
        </Image>
        <FlatList
          data={routes}
          scrollEnabled={true}
          keyExtractor={(r, i) => i + ''}
          renderItem={({item, index}) =>
            <View style = {styles.stepView}>{this.displayByMode(item)}</View>}
        />

        <TouchableOpacity onPress={this.pressed()} style={styles.infoButton}>
          <Text style={styles.buttonText}> Get Accessibility Information ♿︎ </Text>
        </TouchableOpacity>
      </View>
    );
  }

  pressed() {
  }

  displayByMode(item) {
    if (item.split('\n')[0].split(' ')[0] == "TRANSIT") {
      return  <View style = {styles.nothing}>   
                <Text style = {styles.text}>🔘 {this.getTransitDetails(item, 2)} </Text>
                <Text style = {styles.betweenSteps}> {this.getBetweenImg(item)} </Text>
                <Text style = {styles.text}>🔘 {this.getTransitDetails(item, 3)} </Text>
              </View>
    } else {
      return  <Text style = {styles.text}> {this.getTransitDetails(item, 2)} </Text>
    }
  }  

  getBetweenImg(item) {
    if (item.split('\n')[0].split(' ')[0] == "TRANSIT") {
      const instruction = item.split('\n')[1];
      //TODO : get the correct line picture
      return <Text style={styles.lineText}>
                <Image source = {require('./central.png')} style = {styles.line}/>
                 Central Line 
                 {instruction}
             </Text>
    }
      return '';
  }
	
		
  getTransitDetails(item, type) {
    const lines = item.split('\n');
    const inst = lines[0].split(' ');
    if (inst[0] == "TRANSIT") {
      return lines[type].split(':')[1]
    } else {
      return "🔘 Your Location \n 🔹" + "\n 🔹" +
             "  Walk " + inst[2] + " min \n"  + " 🔹 \n" +
             " 🔘 " + lines[1].substring(7, lines[1].length)
    }
  }

  getLine(name) {
    return "./" + name.split(' ')[0].toLowerCase() + ".png"
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
  },
  infoButton: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    //backgroundColor: '#21abcd',
    borderColor: 'grey',
    width: 350,
    height: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  stepView: {
    backgroundColor: 'white',
    borderColor: 'black',
    width: 320,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14, 
    borderTopRightRadius: 14,
    marginTop: 10,
    alignSelf: 'center'
  },
  line: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 15
  },
  lineText: {
    alignSelf: 'center'
  },
});
