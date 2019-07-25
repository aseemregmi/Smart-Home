import React, { Component } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import axios from "axios";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button } from "react-native-elements";
import { connect } from "react-redux";

class ScheduleScreen extends Component {
  static navigationOptions = {
    title: "Schedule",
    headerStyle: {
      backgroundColor: "#3D6DCC"
      // headerText: "skanda"
    }
  };
  state = {
    startDate: null,
    selectedInfo: "default",
    gadgetPiInfo: [],
    startDatePickerVisible: false,
    endDatePickerVisible: false,
    pickerDefault: false,
    action: false
  };

  componentDidMount() {
    axios
      .get(`http://192.168.43.118:3000/api/gadget/${this.props.username}`)
      .then(res => this.setState({ gadgetPiInfo: res.data }))
      .catch(err => console.log(err));
  }

  handleOnConfirm = date => {
    this.setState({ startDate: date, startDatePickerVisible: false });
  };

  hideDateTimePicker = () => {
    this.setState({
      endDatePickerVisible: false,
      startDatePickerVisible: false
    });
  };

  handleSwitchButtonPressed = () => {
    const selectedInfo = JSON.parse(this.state.selectedInfo);
    axios
      .post("http://192.168.43.118:3000/api/schedule", {
        datetime: new Date(this.state.startDate).getTime(),
        action: this.state.action,
        rpi_id: selectedInfo.rpi_id,
        gadget_id: selectedInfo.gadget_id
      })
      .then(res => alert("Task Successfull"))
      .catch(err => alert("Task Failed"));
  };

  renderPicker = () => {
    return (
      <View>
        <Picker
          selectedValue={this.state.selectedInfo}
          onValueChange={itemValue => {
            this.setState({ selectedInfo: itemValue });
          }}
        >
          <Picker.Item label="Select the gadget to schedule" value="default" />
          {this.state.gadgetPiInfo.map(gadgetPi => {
            console.log(gadgetPi.gadget_name);
            return (
              <Picker.Item
                key={gadgetPi.gadget_id}
                label={gadgetPi.gadget_name}
                value={JSON.stringify({
                  gadget_id: gadgetPi.gadget_id,
                  rpi_id: gadgetPi.rpi_id
                })}
              />
            );
          })}
        </Picker>

        <DateTimePicker
          mode="datetime"
          isVisible={this.state.startDatePickerVisible}
          onConfirm={this.handleOnConfirm}
          onCancel={this.hideDateTimePicker}
        />

        <Button
          title={
            this.state.startDate
              ? new Date(this.state.startDate).toLocaleString()
              : "Select Time to Schedule"
          }
          onPress={() => {
            this.setState({ startDatePickerVisible: true });
          }}
        />

        <Picker
          selectedValue={this.state.action}
          onValueChange={res => {
            this.setState({ action: res });
          }}
        >
          <Picker.Item value={this.state.pickerDefault} label="Off" />
          <Picker.Item value={!this.state.pickerDefault} label="On" />
        </Picker>

        <Button title="Ok" onPress={this.handleSwitchButtonPressed} />
      </View>
    );
  };

  render() {
    return <View style={styles.container}>{this.renderPicker()}</View>;
  }
}

mapStateToProps = state => ({
  username: state.login.username
});

export default connect(mapStateToProps)(ScheduleScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
