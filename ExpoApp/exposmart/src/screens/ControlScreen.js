import React, { Component } from "react";
import { View, StyleSheet, Text, Picker } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { Header, Input, Button } from "react-native-elements";
import { deviceAdded } from "./../Actions";

class ControlScreen extends Component {
  state = {
    pi: null,
    selectedRpId: "default",
    gadgetType: null,
    selectedGadgetType: "default",
    gadgetName: "",
    gpioNo: null,
    power: null
  };
  componentDidMount() {
    axios
      .get(`http://192.168.100.10:3000/api/pi/${this.props.username}`)
      .then(res => this.setState({ pi: res.data }))
      .catch(err => console.log(err));

    axios
      .get("http://192.168.100.10:3000/api/gadget_type")
      .then(res => this.setState({ gadgetType: res.data }))
      .catch(err => console.log(err));
  }

  renderSelectGadgetType = () => {
    return (
      <Picker
        selectedValue={this.state.selectedGadgetType}
        onValueChange={itemValue =>
          this.setState({ selectedGadgetType: itemValue })
        }
      >
        <Picker.Item label="Select Gadget Type of the device" value="default" />
        {this.state.gadgetType.map(gadgetType => {
          return (
            <Picker.Item
              key={gadgetType.gadget_type_name}
              label={gadgetType.gadget_type_name}
              value={gadgetType.gadget_type_id}
            />
          );
        })}
      </Picker>
    );
  };

  renderSelectPi = () => {
    return (
      <Picker
        selectedValue={this.state.selectedRpId}
        onValueChange={itemValue => this.setState({ selectedRpId: itemValue })}
      >
        <Picker.Item label="Select RP for the device" value="default" />
        {this.state.pi.map(pi => {
          return (
            <Picker.Item
              key={pi.rpi_name}
              label={pi.rpi_name}
              value={pi.rpi_id}
            />
          );
        })}
      </Picker>
    );
  };

  render() {
    if (!this.state.pi || !this.state.gadgetType) {
      return (
        <View>
          <Header
            centerComponent={{ text: "ADD GADGETS", style: { color: "#fff" } }}
          />
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: "ADD GADGETS", style: { color: "#fff" } }}
        />
        {this.renderSelectPi()}
        {this.renderSelectGadgetType()}
        <Input
          placeholder="Enter the name of your device"
          style={{ width: "100%" }}
          value={this.state.gadgetName}
          onChangeText={text => this.setState({ gadgetName: text })}
        />
        <Input
          placeholder="Enter the gpioNo of your device"
          style={{ width: "100%" }}
          value={this.state.gpioNo}
          onChangeText={text => this.setState({ gpioNo: text })}
        />
        <Input
          placeholder="Enter the power consumption of your device in watts"
          style={{ width: "100%" }}
          value={this.state.power}
          onChangeText={text => this.setState({ power: text })}
        />
        <Button
          title="Add Gadget"
          onPress={() => {
            axios
              .post("http://192.168.100.10:3000/api/gadget", {
                rpi_id: this.state.selectedRpId,
                gadget_type_id: this.state.selectedGadgetType,
                gadget_name: this.state.gadgetName,
                gpio_number: this.state.gpioNo,
                power: this.state.power
              })
              .then(res => {
                this.props.deviceAdded(this.props.username);
                this.props.navigation.navigate("first");
                alert("Device Added");
                this.setState({
                  selectedRpId: "default",
                  selectedGadgetType: "default",
                  gadgetName: "",
                  gpioNo: null,
                  power: null
                });
              })
              .catch(err => {
                alert("Network Connection Failed or Invalid Data");
                this.setState({
                  selectedRpId: "default",
                  selectedGadgetType: "default",
                  gadgetName: "",
                  gpioNo: "",
                  power: ""
                });
              });
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.login.username
  };
};

export default connect(
  mapStateToProps,
  { deviceAdded }
)(ControlScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
