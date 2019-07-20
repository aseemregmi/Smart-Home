import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  ScrollView
} from "react-native";
import axios from "axios";
import Charts from "./Charts.js";
import { connect } from "react-redux";
import { Header } from "react-native-elements";

const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * DEVICE_WIDTH;

class PowerConsumptionScreen extends Component {
  constructor(props) {
    super(props);
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < -SWIPE_THRESHOLD) {
          this.props.navigation.navigate("third");
        } else if (gesture.dx > SWIPE_THRESHOLD) {
          this.props.navigation.navigate("first");
        }
      }
    });
    this.panResponder = panResponder;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: "ENERGY CONSUMED",
            style: { color: "#fff" }
          }}
        />
        <View
          {...this.panResponder.panHandlers}
          style={{
            height: DEVICE_HEIGHT,
            width: DEVICE_WIDTH,
            backgroundColor: "white"
          }}
        >
          <Charts username={this.props.username} />
        </View>
      </View>
    );
  }
}
export default connect(state => ({ username: state.login.username }))(
  PowerConsumptionScreen
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
