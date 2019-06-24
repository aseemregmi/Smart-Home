import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

class PowerConsumptionScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PowerConsumptionScreen</Text>
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
