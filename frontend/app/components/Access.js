import React, { Component } from 'react';
import Rating from 'react-native-rating';
import { Easing } from 'react-native';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';

  export default class Access extends Component{
    constructor(props) {
      super(props);
      this.state = {
    };
  }

  static navigationOptions = {
		title: 'Accessibility Details'
	};
	
  render() {
    const { navigate } =  this.props.navigation;
    const routes = this.props.navigation.state.params.route
    const steps = routes.steps
    const images = {
      starFilled: require('./star_filled.png'),
      starUnfilled: require('./star_unfilled.png')
    }
 
    return(<View style = {styles.container}>
             <Image source = {require('./plainbackground.jpg')} style = {styles.image}/>                            
             <FlatList
                 data={this.getAccessibilityData(steps)}
                 scrollEnabled={true}
                 keyExtractor={(r, i) => i + ''}
                 renderItem={({item, index}) =>
                 <View style = {styles.view}>
                   <Text> {item} </Text>
                 </View>} 
              />
              <Rating
                 onAnimationComplete={rating => this.ratingCompleted(rating)}
                 selectedStar={images.starFilled}
                 unselectedStar={images.starUnfilled}
                 config={{easing: Easing.inOut(Easing.ease), duration: 450 }}
                 stagger={80}
                 maxScale={1.4}
                 starStyle={{width: 40, height: 40}}
               />
               <TextInput style={styles.reviewText}
                  placeholder="Leave a review"
                  value={this.state.reviewText}
                  onChangeText = {(reviewText)=>this.setState({reviewText})}/>
           </View>);
  }
	
  ratingCompleted(rating) {
    const station = encodeURIComponent("Holborn");
    fetch('https://safe-bastion-98845.herokuapp.com/rateStation?station=' + station + '&rating=' + rating)
    //fetch('http://localhost:3000/rateStation?station=' + station + '&rating=' + rating)
  }

  getAccessibilityData(data) { 
    return data
      .filter(x => x.travelMode === "TRANSIT")
      .map(step => {
          return step.lineDetails.departureStop + "\n" + this.formatAccess(step.lineDetails.departureAccess) + "\n"
                 step.lineDetails.arrivalStop + "\n" + this.formatAccess(step.lineDetails.arrivalAccess)
    })
  }

  formatAccess(data) {
    if (data.length > 0) {
      return "🔹 Lift: " + data[0].lift + "\n" + this.formatLineInfo(data[0].lineInfo || []) 
    } else {
      return "🔹 Manual Ramp: Yes"
    }
  }

  formatLineInfo(lineInfo) {
    return lineInfo.map(info => {
      return "🔹" + info.lineName + " (" + info.direction + " towards " + info.directionTowards .trim()+ ")\n" +
      "    Step: " + info.stepMin + "–" + info.stepMax + "\n" +
      "    Gap: " + info.gapMin + "–" + info.gapMax + " cm\n"
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
  },
  reviewText: {
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
    borderColor: 'black',
    color: 'black',
    height: 50,
  },
})
 
