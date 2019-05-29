import React from "react";
import { AppRegistry, View, Text } from "react-native";
import Header from "./components/Header";
import BottomArea from "./components/BottomArea";

const App = () => {
  return (
    <View style={styles.viewStyle}>
      <Header headerText="Stay Smart" />
      <BottomArea />
    </View>
  );
};

const styles = {
  viewStyle: {
    height: 710,
    backgroundColor: "black"
  }
};

AppRegistry.registerComponent("SmartHome", () => App);
