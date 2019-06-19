import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeControllerScreen from "./HomeControllerScreen";
import PowerConsumptionScreen from "./PowerConsumptionScreen";
import SettingScreen from "./SettingScreen";
import Icons from "react-native-vector-icons/Ionicons";

class DashBoard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}
export default DashBoard;

const AppTabNavigator = createBottomTabNavigator(
  {
    first: {
      screen: HomeControllerScreen,

      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icons name="ios-home" size={24} color={tintColor} />
        )
      }
    },
    second: {
      screen: PowerConsumptionScreen,
      navigationOptions: {
        tabBarLabel: "Power Consumption",
        tabBarIcon: ({ tintColor }) => (
          <Icons name="ios-battery-full" size={24} color={tintColor} />
        )
      }
    },
    third: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icons name="ios-settings" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "green",
      inactiveTintColor: "purple"
    }
  }
);
const AppContainer = createAppContainer(AppTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
