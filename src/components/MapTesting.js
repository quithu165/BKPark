import React, {Component, PermissionsAndroid} from 'react';
import WebView from 'react-native-webview';
import styles from '../styles/MapStyles';
import map from '../common/map';
import {Text, View, TouchableOpacity} from 'react-native';

class MapTesting extends Component {
  // componentDidMount(){
  //     PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'Location Access Permission',
  //           message: 'We would like to use your location',
  //           buttonPositive: 'Okay'
  //         }
  //       );
  // }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={'Map_Ref'}
          source={{html: map}}
          geolocationEnabled={true}
        />
        <View style={styles.overlay}>
          
        </View>
      </View>
    );
  }
}

export default MapTesting;
