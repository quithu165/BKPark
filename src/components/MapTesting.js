import React, {Component, PermissionsAndroid} from 'react';
import WebView from 'react-native-webview';
import styles from '../styles/MapStyles';
import map from '../common/map';
import {Text, View, TouchableOpacity} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class MapTesting extends Component {
  state = {
    location: null,
  };
  findCoordinates = () => {
    Geolocation.getCurrentPosition(data => console.log(data));
    if (this.state.location === null) console.log("Null");
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          <Text>Location: Null</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default MapTesting;
