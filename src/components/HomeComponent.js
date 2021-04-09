import React, {Component} from 'react';

import {
  Text,
  BackHandler,
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
import {Overlay} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import {call} from 'react-native-reanimated';
const axios = require('axios');

class HomeComponent extends Component {
  state = {
    showListParkingLot: false,
    parkingLocation: {},
    parkingList: [],
    searchingResult: [],
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
    curLocation: {
      latitude: 10.77057,
      longitude: 106.672547,
    },
    desLocation: {
      latitude: 10.77057,
      longitude: 106.672547,
    },
    curBooking: null,
    userID: null,
    searchingKeyWord: '',
    searchResultApperance: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // this.getParkingLotData();
    this.checkUserAuthentificate();
    console.log('INIT: RENDER');
    // this.getParkingLotData();
    this.interval = setInterval(() => this.getParkingLotData(this.state.curLocation.latitude, this.state.curLocation.longitude), 5000);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    console.log('FINISH: UNmount');
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

  //*****************************************
  //       HANDLE DROPDOWN CONTENT
  //*****************************************
  handleDropdownSelect(userOption) {
    if (this.state.userStatus == '0') {
      switch (userOption) {
        case 0:
          this.props.navigation.navigate('login');
          break;

        case 1:
          this.props.navigation.navigate('signupuser');
          break;
        case 2:
          this.props.navigation.navigate('map');
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
      this.setState({userOption: ['Login', 'Signup', 'Map Testing']});
      this.setState({checkingLogin: false});
    }
  }
  //*****************************************
  //               DRAW MARKER
  //*****************************************
  setViewOnMap(latitude, longitude){
    var latitudeTxt = JSON.stringify(latitude);
    var longtitudeTxt = JSON.stringify(longitude);
    this.Map_Ref.injectJavaScript(`
      mymap.setView([${latitudeTxt}, ${longtitudeTxt}]);
    `);
  }
  markLocationBaseCoordinates(lat, long, type, id) {
    var idTxT = JSON.stringify(id);
    this.Map_Ref.injectJavaScript(`
      markLocation(${lat}, ${long}, ${type}, ${idTxT})
    `);
  }
  converStatus2Level(status) {
    if (status >= 0.5) return 'Empty';
    else if (status > 0) return 'Normal';
    return 'Full';
  }
  markParkingBaseLoc(parkingArray, size) {
    for (var i = 0; i < size; i++) {
      // console.log( parkingArray[i]._id);
      switch (this.converStatus2Level(parkingArray[i].status)) {
        case 'Full':
          this.markLocationBaseCoordinates(
            parkingArray[i].coordinate.longitude,
            parkingArray[i].coordinate.latitude,
            1,
            parkingArray[i]._id,
          );
          break;
        case 'Normal':
          this.markLocationBaseCoordinates(
            parkingArray[i].coordinate.longitude,
            parkingArray[i].coordinate.latitude,
            2,
            parkingArray[i]._id,
          );
          break;
        case 'Empty':
          this.markLocationBaseCoordinates(
            parkingArray[i].coordinate.longitude,
            parkingArray[i].coordinate.latitude,
            3,
            parkingArray[i]._id,
          );
          break;
        default:
          break;
      }
    }
  }
  saveCurLocation(data) {
    // console.log(data);
    this.setState({
      curLocation: {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      },
    });
    console.log('CURRENT LOCATION:' + this.state.curLocation);
  }
  getCurLocation() {
    Geolocation.getCurrentPosition(
      data => this.saveCurLocation(data),
      error => console.log('ERROR: LOCATION ERROR'),
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000},
    );
    // console.log(this.state.curLocation, "HERE");
  }

  markCurLocation() {
    // console.log(this.state.curLocation.latitude);
    var latitudeTxt = JSON.stringify(this.state.curLocation.latitude);
    var longtitudeTxt = JSON.stringify(this.state.curLocation.longitude);
    this.Map_Ref.injectJavaScript(`
      mymap.setView([${latitudeTxt}, ${longtitudeTxt}]);
    `);
    this.getParkingLotData(this.state.curLocation.latitude, this.state.curLocation.longitude);
  }
  getParkingLotData(latitude, longitude) {
    this.getCurLocation();
    this.setState({
      userID:
        this.props.route.params === undefined
          ? ''
          : this.props.route.params._id,
    });
    this.markLocationBaseCoordinates(
      this.state.curLocation.latitude,
      this.state.curLocation.longitude,
      4,
      'test',
    );
    axios
      .post('http://gogito.duckdns.org:3002/cal_coor', {
        current: {
          latitude: longitude,
          longitude: latitude,
        },
        radius: '0.7',
      })
      .then(
        response => {
          console.log(response.data);
          var sizeOfResponse = JSON.stringify(response.data.resultArray.length);
          this.markParkingBaseLoc(response.data.resultArray, sizeOfResponse);
          this.createOverlayList(response.data.resultArray, sizeOfResponse);
          this.setState({
            parkingLocation: response.data.resultArray,
          });
          this.setState({sizeofData: sizeOfResponse});
        },
        error => {
          console.log(error.response.data.message);
          // Alert.alert('Wrong username or password!');
        },
      );
  }
  testServer() {
    axios.get('http://gogito.duckdns.org:3002/users').then(
      response => {
        // console.log(JSON.stringify(response.data));
      },
      error => {
        // console.log(error.response);
      },
    );
  }
  //*****************************************
  //       HANDLE PARKING LOT LIST
  //*****************************************

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
          // console.log(item);
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
      // console.log(this.props.route.params);
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
      // console.log('createOvelayList: USER ID:' + parkingItem.userID);
      // console.log(parkingItem);
      this.addParkingLotItem(parkingItem);
    }
    // console.log(this.state.parkingList);
  }
  //*****************************************
  //                MAP TOUCHING
  // FLOW: SEND PARKINGLOT ID FOR HTML --onTouch--> HTML send ID BACK --> GET DATA --> SEND DATA TO HTML
  //*****************************************
  showDetailPopup(id, name, status, price) {
    var idTxT = JSON.stringify(id);
    var nameTxT = JSON.stringify(name);
    var statusTxT = JSON.stringify(status);
    var priceTxT = JSON.stringify(price);
    // console.log(idTxT, nameTxT, statusTxT, priceTxT);
    this.Map_Ref.injectJavaScript(`
      updateDetailPopup(${idTxT}, ${nameTxT}, ${statusTxT}, ${priceTxT})
    `);
  }
  getDetailPopup(id) {
    var name;
    var status;
    var price = 1000000000;
    console.log('UPDATE: update status for parking lot');
    axios.get('http://www.gogito.duckdns.org:3002/parkinglots/' + id).then(
      response => {
        name = JSON.stringify(response.data.name);
        status = Math.round(response.data.status * 100) + '%';

        for (var i = 0; i < response.data.area.length; i++) {
          if (response.data.area[i].price < price) {
            price = response.data.area[i].price;
          }
        }
        this.showDetailPopup(id, name, status, price);
      },
      error => {
        console.log(error.response.data.message);
      },
    );
    // console.log(price);
  }
  onTouchParkingLotIcon(event) {
    // console.log(event.nativeEvent.data);
    this.getDetailPopup(event.nativeEvent.data);
  }
  //*****************************************
  //                MAP ROUTING
  // FLOW: GET BOOKING ID --> GET PARKING LOT ID --> ROUTING INTERVAL 15s
  //*****************************************
  routing(initLong, initLat, desLong, desLat) {
    var initLatTxt = JSON.stringify(initLat);
    var initLongTxt = JSON.stringify(initLong);
    var desLatTxt = JSON.stringify(desLat);
    var desLongTxt = JSON.stringify(desLong);
    if (this.Map_Ref !== undefined) {
      this.Map_Ref.injectJavaScript(`
      routing(${initLong}, ${initLat}, ${desLong}, ${desLat})
    `);
    }
  }
  getParkingLotCoordinates(parkingLotID) {
    console.log('getParkingLotCoordinates: ' + parkingLotID);
    axios
      .get('http://gogito.duckdns.org:3002/parkinglots/' + parkingLotID)
      .then(
        response => {
          // console.log(JSON.stringify(response.data));
          this.setState({
            desLocation: {
              latitude: response.data.coordinate.longitude,
              longitude: response.data.coordinate.latitude,
            },
          });
        },
        error => {
          console.log(error.response.data.message);
        },
      );
    console.log(this.state.desLocation);
    console.log(this.state.curLocation);
    if (this.Map_Ref !== undefined) {
      this.routing(
        this.state.curLocation.longitude,
        this.state.curLocation.latitude,
        this.state.desLocation.longitude,
        this.state.desLocation.latitude,
      );
      this.interval = setInterval(
        () =>
          this.routing(
            this.state.curLocation.longitude,
            this.state.curLocation.latitude,
            this.state.desLocation.longitude,
            this.state.desLocation.latitude,
          ),
        5000,
      );
    }
  }
  getCurrentBookingLotID(bookingID) {
    console.log('getCurrentBookingLotID: ' + bookingID);
    axios.get('http://gogito.duckdns.org:3002/bookings/' + bookingID).then(
      response => {
        // console.log(JSON.stringify(response.data));
        this.getParkingLotCoordinates(response.data.parkinglotID);
      },
      error => {
        console.log(error.response.data.message);
      },
    );
  }
  getCurrentBookingID(userID) {
    console.log('getCurrentBookingID: ' + userID);
    axios.get('http://gogito.duckdns.org:3002/users/' + userID).then(
      response => {
        // console.log(JSON.stringify(response.data));
        this.getCurrentBookingLotID(response.data.currentBooking);
      },
      error => {
        console.log(error.response.data.message);
      },
    );
  }
  //*****************************************
  //                SEARCH ENGINE
  // FLOW: GET KEYWORD --> REQUEST API and SOLVE --> OPEN OVERLAY RESULT
  //*****************************************
  addSearchingResultItem(item) {
    this.setState({searchingResult: [...this.state.searchingResult, item]});
  }
  createNominatimResponseDataItem(response) {
    this.toggleShowSearchResult();
    this.setState({searchingResult: []});
    for (var i = 0; i < response.length; i++) {
      var searchingItem;
      searchingItem = {
        place_id: response[i].place_id,
        coordinate:{
          latitude: response[i].lat,
          longitude: response[i].lon
        },
        name: response[i].display_name
      }
      this.addSearchingResultItem(searchingItem);
    }
    // console.log(this.state.searchingResult[1]);
  }
  callNominatimAPI(keyword) {
    console.log(keyword);
    axios
      .get(
        'https://nominatim.openstreetmap.org/search?q=' +
          keyword +
          '&format=json&polygon_geojson=1&addressdetails=1',
      )
      .then(
        response => {
          // console.log(JSON.stringify(response.data[1].boundingbox));
          this.createNominatimResponseDataItem(response.data);
        },
        error => {
          console.log(error.response.data.message);
        },
      );
  }
  getKeyWord() {
    var handledKeyword = JSON.stringify(this.state.searchingKeyWord).replace(
      / /g,
      '+',
    );
    this.callNominatimAPI(handledKeyword);
  }
  toggleShowSearchResult() {
    this.setState({searchResultApperance: !this.state.searchResultApperance});
  }
  renderSearchingResultItem= ({item}) =>(
    <View style={styles.parkingLotItemWrapper}>
      <TouchableOpacity
        style={styles.parkingLotItemNameWrapper}
        onPress={() => {
          console.log(item);
          this.toggleShowSearchResult();
          this.setViewOnMap(item.coordinate.latitude, item.coordinate.longitude);
          this.getParkingLotData(item.coordinate.latitude, item.coordinate.longitude);
        }}>
        <View>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
  //RENDER=========================================================================================================
  render() {
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          javaScriptEnabled={true}
          allowFileAccess={true}
          ref={component => (this.Map_Ref = component)}
          source={{html: map}}
          geolocationEnabled={true}
          onMessage={this.onTouchParkingLotIcon.bind(this)}
        />
        <View style={styles.overlay}>
          <View style={styles.body}>
            <View style={styles.header}>
              <View style={styles.userOptions}>
                <ModalDropdown
                  style={styles.dropdownIcon}
                  dropdownStyle={styles.dropdownList}
                  // renderSeparator={() => <View /> }
                  onSelect={userOption => this.handleDropdownSelect(userOption)}
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
                    onChangeText={text =>
                      this.setState({searchingKeyWord: text})
                    }
                  />
                  <TouchableOpacity
                    style={styles.searchIconArea}
                    onPress={() => this.getKeyWord()}>
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
            style={styles.routingIcon}
            onPress={() => {
              this.getCurrentBookingID(this.state.userID);
            }}>
            <Image
              style={styles.geolocationIconSize}
              source={require('../../assets/routing.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.geolocationIcon}
            onPress={() => {
              this.markCurLocation();
            }}>
            <Image
              style={styles.geolocationIconSize}
              source={this.state.testImg}></Image>
          </TouchableOpacity>
          <Overlay
            fullScreen="true"
            windowBackgroundColor="#EF2440"
            overlayBackgroundColor="red"
            overlayStyle={styles.showDataOverlay}
            isVisible={this.state.showListParkingLot}
            onBackdropPress={() => this.toggleShowParkingLot()}>
            <Text style={styles.titleList}> PARKING LIST</Text>
            <FlatList
              data={this.state.parkingList}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
            />
          </Overlay>

          <Overlay
            fullScreen="true"
            windowBackgroundColor="#EF2440"
            overlayBackgroundColor="red"
            overlayStyle={styles.showDataOverlay}
            isVisible={this.state.searchResultApperance}
            onBackdropPress={() => this.toggleShowSearchResult()}>
            <Text style={styles.titleList}> Result Found</Text>
            <FlatList
              data={this.state.searchingResult}
              renderItem={this.renderSearchingResultItem}
              keyExtractor={item => item.place_id}
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
