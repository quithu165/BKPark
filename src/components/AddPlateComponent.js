import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/AddPlateStyles'
const axios = require('axios');
class AddPlateComponent extends Component {
  state = {
    plateNumber: '',
  };
  handlePlate = (text) => {
    this.setState({plateNumber: text});
  };
  registerNewPlate(plateNumber){
      console.log(plateNumber);
      console.log(this.props.route.params);
    axios
    .put('http://gogito.duckdns.org:3002/users/' + this.props.route.params, {
      infoArray:{
          carplateNumber: plateNumber
      }
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    //   this.props.navigation.navigate('login');
    })
    .catch((error) => {
      console.log(error.response.message);
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputPlate}>
          <TextInput
            style={styles.inputText}
            placeholder="XXAB.XXXX..."
            placeholderTextColor="#7575a3"
            onChangeText={this.handlePlate}
          />
        </View>
        <TouchableOpacity style={styles.btnConfirm} onPress={() => {this.registerNewPlate(this.state.plateNumber)}}>
          <Text style={styles.confirmText}>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddPlateComponent;
