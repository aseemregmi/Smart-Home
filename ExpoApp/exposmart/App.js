import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import DashBoard from "./src/screens/DashBoard";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import WelcomeScreen from "./src/screens/WelcomeScreen";

class App extends Component {
  state = {
    skipped: false,
    loggedIn: false
  };
  componentWillMount = async () => {
    const loggedIn = await AsyncStorage.getItem("LoggedIn");
    const skipped = await AsyncStorage.getItem("skipped");
    if (loggedIn === "1" && skipped === "1") {
      this.setState({ loggedIn: true, skipped: true });
    } else if (loggedIn !== "1" && skipped === "1") {
      this.setState({ skipped: true });
    }
  };

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
