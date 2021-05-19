const React = require('react-native');

import {Dimensions} from 'react-native';
import {colors} from 'react-native-elements';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const {StyleSheet} = React;

export default {
  container: {
    flex: 1,
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    top: '2%',
    left: '1%',
    right: '10%',
  },
  body: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: Dimensions.get('window').width,
    height: '100%',
  },
  //Style Header
  searchBox: {
    flex: 9,
    left: '1%',
    padding: '1%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchArea: {
    flex: 9,
    width: '95%',
    height: 45,
    borderRadius: 15,
    borderColor: 'white',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '1%',
    right: '2%',
    top: '12%',
    bottom: '12%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  searchIconArea: {
    flex: 3,
    width: 35,
    height: 35,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  searchInput: {
    flex: 24,
    height: 45,
    color: 'black',
  },
  searchTemp: {
    flex: 1,
    width: 35,
    height: 35,
  },
  userOptions: {
    flex: 1,
    left: '1%',
    padding: '1%',
    justifyContent: 'center',
  },
  dropdownIcon: {
    flex: 1,
    width: 100,
    height: 100,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  //Style dropdown list and its components
  dropdownList: {
    flex: 1,
    borderColor: 'black',
    backgroundColor: '#F9FBFC',
    width: '50%',
    justifyContent: 'center',
  },
  usericon: {
    width: 35,
    height: 35,
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  geolocationIcon: {
    width: 60,
    height: 60,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: '#b3b3b3',
    right: 30,
    top: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  dropdownIconImg: {
    width: 40,
    height: 40,
    flex: 1,
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: '#b3b3b3',
  },
  routingIcon: {
    width: 60,
    height: 60,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: '#b3b3b3',
    right: 30,
    top: '60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  geolocationIconSize: {
    width: 40,
    height: 40,
  },
  viewParkingLot: {
    position: 'absolute',
    width: 150,
    backgroundColor: '#5C5CF0',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    top: '85%',
    right: '30%',
  },
  cancelBooking: {
    position: 'absolute',
    backgroundColor: '#F12809',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    top: 10,
    left: 10,
  },
  showListButton: {
    fontSize: 18,
    color: 'white',
  },
  cancelBookingBtn: {
    color: 'black',
    fontSize: 25,
  },
  showDataOverlay: {
    width: '80%',
    height: '80%',
    backgroundColor: '#F9F0F1',
    borderRadius: 25,
    position: 'absolute',
  },
  titleList: {
    fontSize: 20,
    marginBottom: 15,
  },
  parkingLotItemWrapper: {
    height: 50,
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#F9E792',
    borderRadius: 10,
  },
  parkingLotItemNameWrapper: {
    flex: 8,
    height: 50,
    //
    marginRight: 10,
    marginLeft: 5,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  parkingLotItemStatusWrapper: {
    flex: 2,
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
  },
  parkingLotNameStyle: {},
  parkingLotItemIconWrapper: {
    flex: 2,
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  parkingLotItemIcon: {
    flex: 3,
    width: 25,
    height: 25,
  },
  parkingLotItemDistance: {
    flex: 2,
    alignItems: 'center',
  },
  parkingLotItemDistanceText: {
    fontSize: 10,
  },
  spinnerTextStyle: {
    color: 'white',
  },
  detailBookingInfoWrapper: {
    position: 'absolute',
    height: 120,
    width: '100%',
    backgroundColor: 'white',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,

    elevation: 23,
  },
  detailBookingName: {
    position: 'absolute',
    left: 55,
    top: 5,
    width: '70%',
    height: 45,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceToDes: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: '12%',
    height: 45,
    backgroundColor: '#ccefff',
    borderRadius: 20,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingNameTxt: {
    fontSize: 20,
  },
  distanceToNextStep: {
    position: 'absolute',
    left: 5,
    bottom: 15,
    width: '12%',
    height: 45,
    backgroundColor: '#ccffcc',
    borderRadius: 20,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    position: 'absolute',
    left: 55,
    bottom: 15,
    width: '70%',
    height: 45,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionTxt: {
    fontSize: 15,
  },
};
