import React, {Component, useState} from 'react';
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
import styles from '../styles/LoginStyles';
const axios = require('axios');

class LoginComponent extends Component {
  
  constructor(props) {
    super(props);
    // this.usernameInput.clear();
    // this.passwordInput.clear();
  }
  state = {
    username: '',
    password: '',
  };
  handleUsername = (text) => {
    this.setState({username: text});
  };
  handlePassword = (text) => {
    this.setState({password: text});
  };
  login = (name, pass) => {
    //alert('email: ' + email + ' password: ' + pass)
    // this.props.navigation.navigate('map');
    // console.log(this.props.route);
    if (name == '') Alert.alert('Username can be empty');
    else if (pass == '') Alert.alert('Password can be empty');
    else {
      axios
        .post('http://gogito.duckdns.org:3002/login', {
          username: name,
          password: pass,
        })
        .then(
          (response) => {
            console.log(JSON.stringify(response.data._id));
            this.props.navigation.navigate('home', response.data);
          },
          (error) => {
            console.log('error');
            Alert.alert('Wrong username or password!');
          },
        );
    }
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
        <View style={styles.inputUsername}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handleUsername}
            // ref={input => { this.usernameInput = input }}
          />
        </View>

        <View style={styles.inputPassword}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handlePassword}
            // ref={input => { this.passwordInput = input }}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            this.login(this.state.username, this.state.password);
          }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <Text
            style={styles.signupBtn}
            onPress={() => {
              this.props.navigation.navigate('signupuser');
            }}>
             {" Signup"}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
export default LoginComponent;
