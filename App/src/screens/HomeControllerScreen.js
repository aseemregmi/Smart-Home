import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Header } from "react-native-elements";
import { deviceAdded, onSwitchValueChange } from "../Actions";

import * as GestureHandler from "react-native-gesture-handler";
const { PanGestureHandler, ScrollView } = GestureHandler;

const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * DEVICE_WIDTH;

class HomeControllerScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props.username);
    console.log(props.gadgets);
  }
  componentDidMount() {
    this.props.deviceAdded(this.props.username);
  }

  onGestureReceived = ({ nativeEvent }) => {
    let { translationX } = nativeEvent;
    if (translationX < -SWIPE_THRESHOLD) {
      this.props.navigation.navigate("second");
    }
  };

  renderGadgets = () => {
    console.log("Render Gadgets");
    console.log(this.props.gadgets);
    if (this.props.gadgets) {
      return this.props.gadgets.map(item => (
        <View
          key={item.gadget_id}
          style={{
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 22,
              marginBottom: 10,
              marginTop: 10
            }}
          >
            {item.gadget_name}
          </Text>
          <Switch
            onValueChange={value =>
              this.props.onSwitchValueChange(item.gadget_id, item.rpi_id, value)
            }
            value={item.status}
            style={{ marginBottom: 20, marginRight: 10 }}
          />
        </View>
      ));
    }
    return <Text>Loading</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: "MY GADGETS", style: { color: "#fff" } }}
          containerStyle={{
            backgroundColor: "#3D6DCC",
            height: 55
          }}
        />
        <View style={{ height: DEVICE_HEIGHT, width: DEVICE_WIDTH, flex: 1 }}>
          <PanGestureHandler onGestureEvent={this.onGestureReceived}>
            <ScrollView>{this.renderGadgets()}</ScrollView>
          </PanGestureHandler>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    gadgets: state.widget.devices
  };
};

export default connect(
  mapStateToProps,
  { deviceAdded, onSwitchValueChange }
)(HomeControllerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
