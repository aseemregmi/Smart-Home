import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ControlScreen from "./ControlScreen";
import ScheduleScreen from "./ScheduleScreen";

const AppStackNavigator = createStackNavigator({
  default: {
    screen: ControlScreen
  },
  schedule: {
    screen: ScheduleScreen
  }
});

const AppContainer = createAppContainer(AppStackNavigator);

class ScheduleParent extends Component {
  navigateToThe = screen => {
    this.props.navigation.navigate(screen);
  };
  render() {
    return (
      <View style={styles.container}>
        <AppContainer screenProps={{ letsnavigate: this.navigateToThe }} />
      </View>
    );
  }
}
export default ScheduleParent;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
