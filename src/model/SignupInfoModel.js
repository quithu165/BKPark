import React, { Component } from 'react';
const axios = require('axios');
class SignupInfoModel extends Component {
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
        console.log("Registering");
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
            console.log("Error");
            console.log(error.response.message);
          });
      };
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default SignupInfoModel;