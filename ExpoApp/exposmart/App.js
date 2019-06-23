import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import DashBoard from "./src/screens/DashBoard";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import WelcomeScreen from "./src/screens/WelcomeScreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
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
  Welcome: {
    screen: WelcomeScreen
  },
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
