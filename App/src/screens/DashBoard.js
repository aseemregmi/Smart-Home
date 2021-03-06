import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  createBottomTabNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import HomeControllerScreen from "./HomeControllerScreen";
import PowerConsumptionScreen from "./PowerConsumptionScreen";
import SettingScreen from "./SettingScreen";
import Icons from "react-native-vector-icons/Ionicons";
import ControlScreen from "./ControlScreen";
import SettingsParent from "./SettingsParent";
import ScheduleParent from "./ScheduleParent";

class DashBoard extends Component {
  componentDidMount() {
    if (!this.props.login.loggedIn) {
      this.props.navigation.navigate("Login");
    }
  }

  componentDidUpdate() {
    if (!this.props.login.loggedIn) {
      this.props.navigation.navigate("Login");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

export default connect(state => ({ login: state.login }))(DashBoard);

const AppTabNavigator = createMaterialBottomTabNavigator(
  {
    first: {
      screen: HomeControllerScreen,

      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: () => <Icons name="ios-home" size={24} />
      }
    },
    second: {
      screen: PowerConsumptionScreen,
      navigationOptions: {
        tabBarLabel: "Power",
        tabBarIcon: () => <Icons name="ios-battery-full" size={24} />
      }
    },
    third: {
      screen: ScheduleParent,
      navigationOptions: {
        tabBarLabel: "Control Panel",
        tabBarIcon: () => <Icons name="ios-desktop" size={24} />
      }
    },
    forth: {
      screen: SettingsParent,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: () => <Icons name="ios-settings" size={24} />
      }
    }
  },
  {
    barStyle: { backgroundColor: "rgba(57, 204, 204,1)" },
    shifting: true
  }
);
const AppContainer = createAppContainer(AppTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
