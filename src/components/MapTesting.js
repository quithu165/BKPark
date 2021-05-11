import React, {Component, PermissionsAndroid} from 'react';
import WebView from 'react-native-webview';
import styles from '../styles/MapStyles';
import map from '../common/map';
import {Text, View, TouchableOpacity} from 'react-native';
import TestBase from '../model/TestBase'
import Geolocation from '@react-native-community/geolocation';
var test;
class MapTesting extends TestBase {
  state = {
    location: null,
    test: null
  };
  componentDidMount(){
    test = setInterval(() => console.log(this.props.route.params), 5000);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.resetInterval.bind(this)}>
          <Text style={styles.welcome}>Delete internal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default MapTesting;
