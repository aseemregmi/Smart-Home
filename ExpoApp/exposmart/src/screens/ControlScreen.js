import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";

class ControlScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button full rounded fail>
            <Text> Manual Mode</Text>
          </Button>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button full rounded fail>
            <Text> Voice Mode</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default ControlScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 2
  },
  buttonStyle: {
    width: 100,
    height: 50,
    backgroundColor: "pink"
  }
});
