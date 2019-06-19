import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import DashBoard from "./src/screens/DashBoard";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}
export default App;

const AppSwitchNavigator = createSwitchNavigator({
  Login: {
    screen: LoginScreen
  },
  DashBoard: {
    screen: DashBoard
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
