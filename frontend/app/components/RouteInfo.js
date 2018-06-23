import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default class RouteInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      route:'',
      currentLocation: 'Your Location'
    };
  }

  static navigationOptions = {
    title: 'Route Details'
  };

  render() {
    const { navigate } =  this.props.navigation;
    const bus = this.props.navigation.state.params.bus; 
		const section = this.props.navigation.state.params.section;
    const routeInfo = this.props.navigation.state.params.routeDescriptions;

    return(
      <View style = {styles.container}>
        <Image source = {require('./plainbackground.jpg')}
        style = {styles.background}>
        </Image>
        <FlatList
          data={this.getTransitMode(section)}
          scrollEnabled={true}
          keyExtractor={(r, i) => i + ''}
          renderItem={({item, index}) =>
            <View style = {styles.stepView}>{this.displayByMode(item)}</View>}
        />
        <TouchableOpacity onPress={() => navigate('Access', {route: routeInfo})} style={styles.infoButton}>
          <Text style={styles.buttonText}> Get Accessibility Information ♿︎ </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
	getTransitMode(section) {
		if (section.title.trim() === "Step Free") {
			return this.props.navigation.state.params.bus;
		}
	    return this.props.navigation.state.params.routeDescriptions;
	}

  displayByMode(item) {
    if (item.split('\n')[0].split(' ')[0] == "TRANSIT") {
      return  <View style = {styles.nothing}>   
                <Text style = {styles.text}>🔘 {this.getTransitDetails(item, 2)} </Text>
                <Text style = {styles.betweenSteps}> {this.getBetweenImg(item)} </Text>
                <Text style = {styles.text}>🔘 {this.getTransitDetails(item, 3)} </Text>
              </View>
    } else {
      return  <Text style = {styles.text}> {this.getTransitDetails(item, 3)} </Text>
    }
  }  

  getBetweenImg(item) {
    if (item.split('\n')[0].split(' ')[0] == "TRANSIT") {
      const instruction = "\n" + item.split('\n')[1].trim() + "\n";
      const mins = item.split('\n')[0].split('-')[1];
      const numStops = item.split('\n')[4].split(":")[1].trim() + " stops (" + mins.trim() + ")" ;
      const line = item.split('\n')[5].split(":")[1].trim();
      return  <View style={styles.transitView}>
                <View style={styles.image}>
                  {this.getLine(line)} 
                  <Text style={styles.lineText}>
                      {line} Line  
                      {instruction} 
                      {numStops}
                  </Text>
                </View>
             </View>
    }
      return '';
  }
		
  getTransitDetails(item, type) {
    const lines = item.split('\n');
    const inst = lines[0].split(' ');
    if (inst[0] == "TRANSIT") {
      return lines[type].split(':')[1]
    } else {
      return "🔘  " + this.state.currentLocation + "\n 🔹" + "\n 🔹" +
             "  Move for " + inst[2] + " min \n"  + " 🔹 \n" +
             " 🔘 " + lines[1].substring(10, lines[1].length)
    }
  }

  getLine(name) {
    switch(name) {
      case "Central":
        return <Image source = {require('./central.png')} style = {styles.line}/>
      case "Piccadilly":
        return <Image source = {require('./picadilly.png')} style = {styles.line}/>
      case "Bakerloo":
        return <Image source = {require('./bakerloo.png')} style = {styles.line}/>
      case "Jubilee":
        return <Image source = {require('./jubilee.png')} style = {styles.line}/>
      case "District":
        return <Image source = {require('./district.png')} style = {styles.line}/>
      case "Circle":
        return <Image source = {require('./circle.png')} style = {styles.line}/>
      case "Metropolitan":
        return <Image source = {require('./metropolitan.png')} style = {styles.line}/>
      case "Northern":
        return <Image source = {require('./northern.png')} style = {styles.line}/>
      case "Hammersmith & City":
        return <Image source = {require('./hammersmith.png')} style = {styles.line}/>
      case "Waterloo & City":
        return <Image source = {require('./waterloo.png')} style = {styles.line}/>
      case "Victoria" :
        return <Image source = {require('./victoria.png')} style = {styles.line}/>
      default : 
        return <Image source = {require('./bus.png')} style = {styles.line}/>
    } 
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
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    borderColor: 'grey',
    width: 350,
    height: 45,
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
    marginLeft: 5
  },
  lineText: {
    marginTop: 2,
    marginLeft: 15,
    fontSize: 14
  },	
  image: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 3.5,
    flexDirection: 'row',
  },
});
