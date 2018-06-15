import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
//AppRegistry.registerComponent('WebApps_Front_End', () => App);


YellowBox.ignoreWarnings(['Warning: encountered 1 time', 'RCTBridge required dispatch_sync to load RCTDevLoadingView.Thismay lead to deadlocks']);
AppRegistry.registerComponent('WebApps_Front_End', () => App);
