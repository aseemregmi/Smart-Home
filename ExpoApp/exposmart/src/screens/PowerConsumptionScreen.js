import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import Charts from "./Charts.js";

class PowerConsumptionScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Charts />
      </View>
    );
  }
}
export default PowerConsumptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
