import React, { Component } from 'react';
import Rating from 'react-native-rating';
import { Easing, Linking, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';

  export default class Access extends Component{
    constructor(props) {
      super(props);
      this.state = {
        reviewText: ''
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
 
    return(
      <View style = {styles.container}>
         <Image source = {require('./plainbackground.jpg')} style = {styles.image}/>                            
      <KeyboardAwareScrollView style= {styles.keyboardview}>
         <ScrollView style={{backgroundColor: 'white', flexDirection: 'column', marginTop: 10,
                       borderWidth: 1, borderColor: 'black',
                       borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
                       borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
         <View style = {styles.view}>
           <Text style = {{fontSize: 15, marginTop: 2, marginBottom: 3, paddingTop: 4}}> {this.getAccessibilityData(steps)} </Text>
         </View>
       </ScrollView>
              <View style={{alignSelf: 'center'}}>
               <Rating
                 onAnimationComplete={rating => this.ratingCompleted(rating)}
                 selectedStar={images.starFilled}
                 placeholderRating={4}
						     initial={3}
                 unselectedStar={images.starUnfilled}
                 config={{easing: Easing.inOut(Easing.ease), duration: 450 }}
                 stagger={80}
                 maxScale={1.4}
                 starStyle={{marginLeft: 7, width: 40, height: 40}}
                 style = {{alignSelf: 'center'}}
               />
              </View>

              <TextInput style={styles.reviewText}
                  multiline
                  blurOnSubmit
                  placeholder="Leave a review..."
                  placeholderTextColor='white' 
                  value={this.state.reviewText}
                  onChangeText = {(reviewText)=>this.setState({reviewText})}
                  onSubmitEnding = {() => Keyboard.dismiss()}/>

               <TouchableOpacity style = {styles.button} onPress={() => this.sendTweet()}>
                  <Text style = {{color: 'white', fontSize: 16}}> Send review to TfL </Text>
               </TouchableOpacity>
      </KeyboardAwareScrollView>
      </View>);
  }

  sendTweet() {
    const subject = encodeURIComponent("Accessibility of " + "Holborn")
    Linking.openURL("mailto:tflaccessibility@tfl.gov.uk?subject=" + subject + "&body=" + this.state.reviewText);
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
        console.log(step)
          return step.lineDetails.departureStop.toUpperCase() + "\n" + this.formatAccess(step.lineDetails.departureAccess) + "\n"
                 step.lineDetails.arrivalStop.toUpperCase() + "\n" + this.formatAccess(step.lineDetails.arrivalAccess)
    })
  }

  formatAccess(data) {
    if (data.length > 0) {
      return " 🔹 Lift: " + data[0].lift + "\n" + " 🔹 Priority Seats: Yes" + "\n" + this.formatLineInfo(data[0].lineInfo || []) +  "\n" 
    } else {
      return " 🔹 Manual Ramp: Yes" + "\n" + " 🔹 Priority Seats: Yes" + "\n" + " 🔹 Wheelchair Priority Space: Yes" + "\n" 
    }
  }

  formatLineInfo(lineInfo) {
    return lineInfo.map(info => {
       var str =  " 🔹" + info.lineName + " (" + info.direction + " towards " + info.directionTowards .trim()+ ")\n" +
                  "        Step: " + info.stepMin + "–" + info.stepMax + " steps" +  "\n";
        if (info.gapMin != '') {
         str += "        Gap: " + info.gapMin + "–" + info.gapMax + " cm\n"
        }
      return str;
    }).join("\n")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardview: {
    width: 300,
  },
  image: {
    flex: 1,
    width: 415,
    height: 717,
    position: 'absolute', 
    resizeMode: 'cover'
  },
  view: {
    marginTop: 10,
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
    marginLeft: 52, 
    marginTop: 1,
    marginBottom: -2,
    fontSize: 16,
    borderColor: 'black',
    color: 'black',
    height: 100,
    textAlignVertical: 'top',
    width: 200
  },
  button: {
    marginTop: 30,
    marginLeft: 69,
    marginBottom: 30,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    width: 170,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
})
 
