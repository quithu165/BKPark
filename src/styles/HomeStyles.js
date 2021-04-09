const React = require('react-native');

import {Dimensions} from 'react-native';

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
    borderRadius: 25,
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
    width: 40,
    height: 40,
    flex: 1,
    position: 'absolute',
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
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 30,
    top: '80%',
  },
  routingIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 30,
    top: '65%',
  },
  geolocationIconSize: {
    width: 55,
    height: 55,
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
  showListButton: {
    fontSize: 18,
    color: 'white',
  },
  showDataOverlay:{
    width:"80%",
    height: "80%",
    backgroundColor: '#F9F0F1',
    borderRadius: 25,
    position: 'absolute',
  },
  titleList:{
    fontSize: 20,
    marginBottom: 15
  },
  parkingLotItemWrapper:{
    height: 50,
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#F9E792",
    borderRadius: 10,
  },
  parkingLotItemNameWrapper:{
    flex: 8,
    height: 50,
    // 
    marginRight: 10,
    marginLeft: 5,
    justifyContent:'center',
    // alignItems: 'center'
    
  },
  parkingLotItemStatusWrapper:{
    flex: 2,
    height: 50,
    justifyContent:'center',
    marginBottom: 10,
    alignItems: 'center'
  },
  parkingLotNameStyle:{

  },
  parkingLotItemIconWrapper:{
    flex: 2,
    height: 50,
    justifyContent:'center',
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  parkingLotItemIcon:{
    flex: 3,
    width: 25,
    height: 25,
  },
  parkingLotItemDistance:{
    flex: 2,
    alignItems: 'center'
  },
  parkingLotItemDistanceText:{
    fontSize: 10
  }
};
