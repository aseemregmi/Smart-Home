import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class ControlScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ControlScreen</Text>
      </View>
    );
  }
}
export default ControlScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
