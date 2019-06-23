import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import Slider from "../Components/Slider";

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
  render() {
    return (
      <View style={styles.container}>
        <Slider
          data={WelcomeData}
          onSkipButtonPressed={async () => {
            this.props.navigation.navigate("Login");
            await AsyncStorage.setItem("skipped", "1");
          }}
        />
      </View>
    );
  }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
