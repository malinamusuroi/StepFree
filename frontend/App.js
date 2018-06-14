import React, { Component } from 'react';
import Main from './app/components/Main.js'
import Routes from './app/components/Routes.js'
import RouteInfo from './app/components/RouteInfo.js'
import Access from './app/components/Access.js'
import { StackNavigator } from 'react-navigation';

const Navigation = StackNavigator ({
	Front: {screen: Main, navigationOptions:{header: null}},
	Routes: {screen: Routes},
	RouteInfo: {screen: RouteInfo},
	Access: {screen: Access}
});

export default class App extends Component {
  render() {
    return (
      <Navigation />
    );
  }
}

