import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from '../styles/ParkingLotDetailStyles';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {Overlay} from 'react-native-elements';
// import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
const axios = require('axios');
class ParkingLotDetailComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    tableHead: ['Area', 'Empty', 'Booked'],
    tableData: [
      ['A1', 1, 3],
      ['A2', 1, 3],
    ],
    showBooking: false,
    showNoticeFailed: false,
    showNocticeSuccess: false,
    areaList: this.props.route.params.area,
    userID: this.props.route.params.userID,
    parkingLotID: this.props.route.params._id,
    spinner: false,
    bookingAvalable: true,
  };

  componentDidMount() {
    // this.createAreaList();
    // setInterval(() => {
    //   if (this.state.spinner)
    //   this.setState({
    //     spinner: false,
    //   });
    // }, 3000);
  }
  updateAreaDB() {
    var data = this.props.route.params.area;
    var test = [];
    this.setState({tableData: []});
    // console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      // var curRow = {[data[i].name, data[i].freeslot, data[i].fullslot]};
      // console.log(curRow);
      // this.setState({tableData:[
      //   ...this.state.tableData,
      //   curRow,
      // ]});
      this.state.tableData.push(curRow);
    }
    console.log(this.state.tableData);
  }
  toggleShowParkingSLot() {
    // console.log(this.state.showBooking);
    this.setState({showBooking: !this.state.showBooking});
  }
  toggleShowNoticeFailed() {
    // console.log(this.state.showBooking);
    this.setState({showNoticeFailed: !this.state.showNoticeFailed});
  }
  toggleShowNoticeSuccess() {
    // console.log(this.state.showBooking);
    this.setState({showNocticeSuccess: !this.state.showNocticeSuccess});
  }
  addItemToList(item) {
    this.state.areaList.push(item);
    // console.log(this.state.areaList);
  }
  createAreaList() {
    this.setState({areaList: []});
    // console.log(this.state.areaList);
    var data = this.props.route.params.area;
    for (var i = 0; i < data.length; i++) {
      if (data[i].freeslot != '0')
        var curItem = {
          areaName: data[i].name.toString(),
          emptySlot: data[i].freeslot,
          price: data[i].price,
        };

      this.addItemToList(curItem);
      // console.log(curItem);
    }
    // console.log(this.state.areaList);
  }
  handleBookingPress() {
    this.toggleShowParkingSLot();
    // this.createAreaList();
  }
  checkBookingAvailable(area) {
    axios.get('http://gogito.duckdns.org:3002/users/' + this.state.userID).then(
      response => {
        console.log(JSON.stringify(response.data.currentBooking));
        curBooking = response.data.currentBooking;
        this.setState({spinner: false});
        if (
          response.data.currentBooking === undefined ||
          response.data.currentBooking === ''
        ) {
          // this.setState({bookingAvalable: false});
          this.booking(area);
        } else {
          this.setState({spinner: false});
          this.toggleShowNoticeFailed();
          // this.setState({bookingAvalable: true});
        }
      },
      error => {
        console.log(error.response.data);
      },
    );
    // console.log(this.state.bookingAvalable);
    // return this.state.bookingAvalable;
  }
  booking(area) {
    axios
      .post('http://gogito.duckdns.org:3002/bookings', {
        userID: this.state.userID,
        parkinglotID: this.state.parkingLotID,
        areaName: area,
      })
      .then(
        response => {
          console.log(JSON.stringify(response.data));
          this.setState({spinner: false});
          this.toggleShowNoticeSuccess();
        },
        error => {
          console.log(error.response.data.message);
          this.setState({spinner: false});
          this.toggleShowNoticeFailed();
        },
      );
  }
  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.parkingLotItemWrapper}
      onPress={() => this.checkBookingAvailable(item.name)}>
      <View style={styles.parkingLotItemNameWrapper}>
        <View>
          <Text>{item.name}</Text>
        </View>
      </View>
      <View style={styles.parkingLotItemStatusWrapper}>
        <Text>{item.freeslot}</Text>
      </View>
      <View style={styles.parkingLotItemIconWrapper}>
        <Text>{item.price + 'VND'}</Text>
      </View>
    </TouchableOpacity>
  );
  renderSuccessBooking() {
    return (
      <Overlay
        fullScreen="true"
        windowBackgroundColor="#EF2440"
        overlayBackgroundColor="red"
        overlayStyle={styles.showParkingDetailOverlay}
        isVisible={this.state.showNotice}
        onBackdropPress={() => this.toggleShowNotice()}>
        <Image
          style={styles.noticeIcon}
          source={require('./../../assets/success.png')}></Image>
      </Overlay>
    );
  }
  renderFailedBooking() {
    return (
      <Overlay
        fullScreen="true"
        windowBackgroundColor="#EF2440"
        overlayBackgroundColor="red"
        overlayStyle={styles.showParkingDetailOverlay}
        isVisible={this.state.showNotice}
        onBackdropPress={() => this.toggleShowNotice()}>
        <Image
          style={styles.noticeIcon}
          source={require('./../../assets/cancel.png')}></Image>
      </Overlay>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.parkingLotImgWrapper}>
          <Image
            style={styles.backgroundImg}
            source={{
              uri:
                'https://irp-cdn.multiscreensite.com/md/unsplash/dms3rep/multi/photo-1506521781263-d8422e82f27a.jpg',
            }}></Image>
        </View>
        {/* Detail */}
        <View style={styles.parkingLotDetailWrapper}>
          <View style={styles.singleDetailWrapper}>
            <Image
              style={styles.detailIcon}
              source={require('../../assets/addressIcon.png')}></Image>
            <Text style={styles.detailTittle}>Address</Text>
          </View>
          <View style={styles.singleDetailContentWrapper}>
            <Text style={styles.singleDetailContentTxt}>
              {this.props.route.params.address}
            </Text>
          </View>
          {/* NEW ITEM */}
          <View style={styles.singleDetailWrapper}>
            <Image
              style={styles.detailIcon}
              source={require('../../assets/parkingSize.png')}></Image>
            <Text style={styles.detailTittle}>Status</Text>
          </View>
          <View style={styles.singleDetailContentWrapper}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row
                data={this.state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={this.state.tableData} textStyle={styles.text} />
            </Table>
            {/* OVERLAY BOOKING */}
            <Overlay
              fullScreen="true"
              windowBackgroundColor="#EF2440"
              overlayBackgroundColor="red"
              overlayStyle={styles.showParkingDetailOverlay}
              isVisible={this.state.showBooking}
              onBackdropPress={() => this.toggleShowParkingSLot()}>
              <Text style={styles.titleList}> BOOKING</Text>
              <View style={styles.header}>
                <View style={styles.headerName}>
                  <Text style={styles.headerTxt}>Area</Text>
                </View>

                <View style={styles.headerSlot}>
                  <Text style={styles.headerTxt}>Free Slot</Text>
                </View>
                <View style={styles.headerPrice}>
                  <Text style={styles.headerTxt}>Price</Text>
                </View>
              </View>
              <FlatList
                data={this.state.areaList}
                renderItem={this.renderItem}
                keyExtractor={item => item.name}
                extraData={this.state}
              />
            </Overlay>
            <Overlay
              fullScreen="true"
              windowBackgroundColor="#EF2440"
              overlayBackgroundColor="red"
              overlayStyle={styles.showNoticeOverlay}
              isVisible={this.state.showNoticeFailed}
              onBackdropPress={() => this.toggleShowNoticeFailed()}>
              <View style={styles.resultNotice}>
                <Image
                  style={styles.noticeIcon}
                  source={require('./../../assets/cancel.png')}></Image>
                <Text style={styles.noticeTxt}>Failed</Text>
              </View>

              <View style={styles.btnNotice}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.toggleShowNoticeFailed()}>
                  <Image
                    style={styles.noticeIconBtn}
                    source={require('./../../assets/return.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.props.navigation.navigate('home')}>
                  <Image
                    style={styles.noticeIconBtn}
                    source={require('./../../assets/home.png')}></Image>
                </TouchableOpacity>
              </View>
            </Overlay>

            <Overlay
              fullScreen="true"
              windowBackgroundColor="#EF2440"
              overlayBackgroundColor="red"
              overlayStyle={styles.showNoticeOverlay}
              isVisible={this.state.showNocticeSuccess}
              onBackdropPress={() => this.toggleShowNoticeSuccess()}>
              <Image
                style={styles.noticeIcon}
                source={require('./../../assets/success.png')}></Image>
              <Text style={styles.noticeTxt}>Success</Text>
              <TouchableOpacity></TouchableOpacity>
            </Overlay>

            <Spinner
              visible={this.state.spinner}
              textContent={'Processing...'}
              textStyle={styles.spinnerTextStyle}
            />
          </View>
          {/* /////FLOAT COMPONENT */}
          <TouchableOpacity
            style={styles.bookingBtn}
            onPress={() => this.handleBookingPress()}>
            <Text style={styles.bookTxt}> BOOK </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.parkingLotNameWrapper}>
          <View style={styles.parkingLotIcon}>
            <Image
              style={styles.iconSize}
              source={require('../../assets/fullSlots.png')}></Image>
          </View>
          <View style={styles.parkingLotName}>
            <Text style={styles.parkingLotNameTxt}>
              {this.props.route.params.name}
            </Text>
          </View>
        </View>
        {/* /////////////////////////////////////////// */}
      </View>
    );
  }
}

export default ParkingLotDetailComponent;
