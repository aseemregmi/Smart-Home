import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class HomeControllerScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>HomeControllerScreen</Text>
      </View>
    );
  }
}
export default HomeControllerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
