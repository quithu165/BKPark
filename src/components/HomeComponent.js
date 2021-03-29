import React, {Component} from 'react';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  BackHandler,
  ToastAndroid,
  Image,
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import WebView from 'react-native-webview';
import map from '../common/map';
import styles from '../styles/HomeStyles';
import ModalDropdown from 'react-native-modal-dropdown';
import {ListItem, Avatar} from 'react-native-paper';
import {Overlay} from 'react-native-elements';
const axios = require('axios');
// const reFocus = useFocusEffect(
//   React.useCallback(() => {
//     console.log("focused");
//     return () => {
//       // alert('Screen was unfocused');
//       // Do something when the screen is unfocused
//       // Useful for cleanup functions
//     };
//   }, []),
// );
class HomeComponent extends Component {
  state = {
    showListParkingLot: false,
    parkingLocation: {},
    parkingList: [],
    testImg: require('../../assets/locUser.png'),
    parkingItem: {
      title: '',
      icon: '',
      status: '',
      distance: '',
    },
    userOption: [],
    userStatus: '',
    checkingLogin: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // this.getCurLocation();
    this.checkUserAuthentificate();
    console.log('Rendered');
    this.interval = setInterval(() => this.getCurLocation(), 5000);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    console.log('DEL');
    clearInterval(this.interval);
  }

  handleBackButton() {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  }


  handleDropdownSelect(userOption) {
    if (this.state.userStatus == '0') {
      switch (userOption) {
        case 0:
          this.props.navigation.navigate('login');
          break;

        case 1:
          this.props.navigation.navigate('signupuser');
          break;

        default:
      }
    } else {
      switch (userOption) {
        case 0:
          this.props.navigation.navigate(
            'userprofile',
            this.props.route.params,
          );
          break;

        case 1:
          this.props.navigation.navigate(
            'addplate',
            this.props.route.params._id,
          );
          break;

        case 2:
          Alert.alert(
            'Logout',
            'Do you want to logout?',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => this.props.navigation.navigate('login', ''),
              },
            ],
            {cancelable: false},
          );

          break;
        case 3:
          this.props.navigation.navigate('map');
          break;
        default:
      }
    }
  }
  checkUserAuthentificate() {
    this.setState({
      userOption: [],
    });
    this.setState({userStatus: ''});
    if (this.props.route.params !== undefined) {
      this.setState({
        userOption: [
          'User Infomation',
          'Add license plate',
          'Quit',
          'Map Testing',
        ],
      });
      this.setState({userStatus: '1'});
      this.setState({checkingLogin: true});
    } else {
      this.setState({userStatus: 0});
      this.setState({userOption: ['Login', 'Signup']});
      this.setState({checkingLogin: false});
    }
  }
  markParkingLots(lat, long, type) {
    this.Map_Ref.injectJavaScript(`
      markLocation(${lat}, ${long}, ${type})
    `);
  }
  converStatus2Level(status) {
    if (status >= 0.5) return 'Empty';
    else if (status > 0) return 'Normal';
    return 'Full';
  }
  markParkingBaseLoc(parkingArray, size) {
    for (var i = 0; i < size; i++) {
      switch (this.converStatus2Level(parkingArray[i].status)) {
        case 'Full':
          this.markParkingLots(
            parkingArray[i].coordinate.longitude,
            parkingArray[i].coordinate.latitude,
            1,
          );
          break;
        case 'Normal':
          this.markParkingLots(
            parkingArray[i].coordinate.longitude,
            parkingArray[i].coordinate.latitude,
            2,
          );
          break;
        case 'Empty':
          this.markParkingLots(
            parkingArray[i].coordinate.longitude,
            parkingArray[i].coordinate.latitude,
            3,
          );
          break;
        default:
          break;
      }
    }
  }
  getCurLocation() {
    //get geolocation
    this.markParkingLots(10.77057, 106.672547, 4);
    this.Map_Ref.injectJavaScript(`
      mymap.setView([10.77057, 106.672547], 15);
    `);
    axios
      .post('http://gogito.duckdns.org:3002/cal_coor', {
        current: {
          latitude: '106.672547',
          longitude: '10.77057',
        },
        radius: '0.7',
      })
      .then(
        (response) => {
          var sizeOfResponse = JSON.stringify(response.data.resultArray.length);
          this.markParkingBaseLoc(response.data.resultArray, sizeOfResponse);
          this.createOverlayList(response.data.resultArray, sizeOfResponse);
          this.setState({
            parkingLocation: response.data.resultArray,
          });
          this.setState({sizeofData: sizeOfResponse});
        },
        (error) => {
          // console.log(error.response);
          // Alert.alert('Wrong username or password!');
        },
      );
  }
  testServer() {
    axios.get('http://gogito.duckdns.org:3002/users').then(
      (response) => {
        // console.log(JSON.stringify(response.data));
      },
      (error) => {
        // console.log(error.response);
      },
    );
  }
  toggleShowParkingLot() {
    this.setState({showListParkingLot: !this.state.showListParkingLot});
  }
  addParkingLotItem(item) {
    this.setState({parkingList: [...this.state.parkingList, item]});
    // console.log(this.state.parkingList);
  }
  renderItem = ({item}) => (
    <View style={styles.parkingLotItemWrapper}>
      <TouchableOpacity
        style={styles.parkingLotItemNameWrapper}
        onPress={() => {
          this.toggleShowParkingLot();
          this.props.navigation.navigate('parkingdetail', item);
        }}>
        <View>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.parkingLotItemStatusWrapper}>
        <Text>{Math.round(item.status * 100) + '%'}</Text>
      </View>
      <View style={styles.parkingLotItemIconWrapper}>
        <Image style={styles.parkingLotItemIcon} source={item.icon}></Image>
        <View style={styles.parkingLotItemDistance}>
          <Text style={styles.parkingLotItemDistanceText}>{item.distance}</Text>
        </View>
      </View>
    </View>
  );
  createOverlayList(data, size) {
    // console.log(size);
    this.setState({parkingList: []});
    for (var i = 0; i < size; i++) {
      var parkingItem;
      var iconRequire;
      // console.log(this.props.route.params._id);
      switch (this.converStatus2Level(data[i].status)) {
        case 'Full':
          iconRequire = require('../../assets/emptySlots.png');
          break;
        case 'Normal':
          iconRequire = require('../../assets/normalSlots.png');
          break;
        case 'Empty':
          iconRequire = require('../../assets/fullSlots.png');
          break;
        default:
          break;
      }
      parkingItem = {
        ...data[i],
        icon: iconRequire,
        distance: '5km',
        userID:
          this.props.route.params !== undefined
            ? this.props.route.params._id
            : '',
        // userID: "604a309f5ba27b60787054b8"
      };
      console.log(parkingItem.userID);
      // console.log(parkingItem);
      this.addParkingLotItem(parkingItem);
    }
    // console.log(this.state.parkingList);
  }
  //RENDER=======================================================================
  render() {
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          javaScriptEnabled={true}
          allowFileAccess={true}
          ref={(component) => (this.Map_Ref = component)}
          source={{html: map}}
          geolocationEnabled={true}
        />
        <View style={styles.overlay}>
          <View style={styles.body}>
            <View style={styles.header}>
              <View style={styles.userOptions}>
                <ModalDropdown
                  style={styles.dropdownIcon}
                  dropdownStyle={styles.dropdownList}
                  // renderSeparator={() => <View /> }
                  onSelect={(userOption) =>
                    this.handleDropdownSelect(userOption)
                  }
                  onDropdownWillShow={() => this.checkUserAuthentificate()}
                  options={this.state.userOption}
                  renderRightComponent={() => (
                    <Image
                      style={styles.usericon}
                      source={require('../../assets/nav-menu.png')}></Image>
                  )}></ModalDropdown>
              </View>
              <View style={styles.searchBox}>
                <View style={styles.searchArea}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#0D0D0F"
                    // onChangeText={this.handleLName}
                  />
                  <TouchableOpacity
                    style={styles.searchIconArea}
                    //   onPress={() => {

                    //   }}
                  >
                    <Image
                      style={styles.searchIcon}
                      source={require('../../assets/search-icon.png')}></Image>
                  </TouchableOpacity>

                  <View style={styles.searchTemp}></View>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.geolocationIcon}
            onPress={() => {
              // console.log('mark');
            }}>
            <Image
              style={styles.geolocationIconSize}
              source={this.state.testImg}></Image>
          </TouchableOpacity>
          <Overlay
            fullScreen="true"
            windowBackgroundColor="#EF2440"
            overlayBackgroundColor="red"
            overlayStyle={styles.showParkingDetailOverlay}
            isVisible={this.state.showListParkingLot}
            onBackdropPress={() => this.toggleShowParkingLot()}>
            <Text style={styles.titleList}> PARKING LIST</Text>
            <FlatList
              data={this.state.parkingList}
              renderItem={this.renderItem}
              keyExtractor={(item) => item._id}
            />
          </Overlay>
          {this.state.checkingLogin && (
            <TouchableOpacity
              style={styles.viewParkingLot}
              onPress={() => {
                this.toggleShowParkingLot();
                // // console.log(this.state.showListParkingLot);
              }}>
              <Text style={styles.showListButton}>P</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default HomeComponent;
