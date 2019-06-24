import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Slider from "../Components/Slider";
import { Skipped } from "../Actions";

const WelcomeData = [
  {
    text: "Welcome To Smart Home.",
    color: "#3D9970"
  },
  {
    text: "Walk with your home in your Pocket",
    color: "#39CCCC"
  },
  {
    text: "Get to know about your power consumption.",
    color: "#FFD662FF"
  }
];

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    if (props.skipped) {
      props.navigation.navigate("Login");
    }
  }

  componentDidUpdate() {
    if (this.props.skipped) {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    console.log("REnder ran");
    return (
      <View style={styles.container}>
        <Slider
          data={WelcomeData}
          onSkipButtonPressed={() => {
            this.props.navigation.navigate("Login");
            this.props.Skipped();
          }}
        />
      </View>
    );
  }
}

export default connect(
  state => {
    return { skipped: state.login.skipped };
  },
  { Skipped }
)(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
