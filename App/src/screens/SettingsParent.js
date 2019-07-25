import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import SettingScreen from "./SettingScreen";
import AboutUs from "./AboutUs";

const AppStacknavigator = createStackNavigator({
  settings: {
    screen: SettingScreen
  },
  aboutUs: {
    screen: AboutUs
  }
});

const AppContainer = createAppContainer(AppStacknavigator);

class SettingsParent extends Component {
  handleNavigation = screenName => {
    this.props.navigation.navigate(screenName);
  };
  render() {
    return (
      <View style={styles.container}>
        <AppContainer
          screenProps={{ handleNavigation: this.handleNavigation }}
        />
      </View>
    );
  }
}
export default SettingsParent;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
