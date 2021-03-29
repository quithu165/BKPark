import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import styles from '../styles/SignupInfoStyles'
const axios = require('axios');
class SignupInfoComponent extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.route.params);
  }
  state = {
    fname: '',
    lname: '',
    email: '',
    personalID: '',
  };
  handleFName = (text) => {
    this.setState({fname: text});
  };
  handleLName = (text) => {
    this.setState({lname: text});
  };
  handleEmail = (text) => {
    this.setState({email: text});
  };
  handlePersonalID = (text) => {
    this.setState({personalID: text});
  };

  register = (username, pass, fname, lname, email, personalID) => {
    axios
      .post('http://gogito.duckdns.org:3002/register', {
        username: username,
        password: pass,
        name: {
          FName: fname,
          LName: lname,
        },
        email: email,
        personalID: personalID,
        userType: 'Customer',
      })
      .then((response) => {
        console.log(JSON.stringify(response.data.username));
        this.props.navigation.navigate('login');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };
  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require('../../assets/homeBackground.jpg')}>
        {/* Logo */}
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}></Image>
        <Image
          style={styles.logoName}
          source={require('../../assets/logoName.png')}></Image>
        {/* Input */}

        <View style={styles.inputUserFname}>
          <TextInput
            style={styles.inputText}
            placeholder="First name"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handleFName}
          />
        </View>

        <View style={styles.inputUserLname}>
          <TextInput
            style={styles.inputText}
            placeholder="Last name"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handleLName}
          />
        </View>

        <View style={styles.inputEmail}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handleEmail}
          />
        </View>

        <View style={styles.inputPersonalID}>
          <TextInput
            style={styles.inputText}
            placeholder="Personal ID number"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handlePersonalID}
          />
        </View>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => {
            this.register(
              this.props.route.params.username,
              this.props.route.params.password,
              this.state.fname,
              this.state.lname,
              this.state.email,
              this.state.personalID,
            );
            console.log(this.props.route);
            // console.log(111)
          }}>
          <Text style={styles.signupText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>You already have an account?</Text>
          <Text
            style={styles.loginBtn}
            onPress={() => {
              this.props.navigation.navigate('login');
            }}>
            {" Login"}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default SignupInfoComponent;
