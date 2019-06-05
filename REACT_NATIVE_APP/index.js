import React from "react";
import { AppRegistry, View } from "react-native";
import Header from "./components/Header";
import BottomArea from "./components/BottomArea";
import { name as appName } from "./app.json";

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

AppRegistry.registerComponent(appName, () => App);
