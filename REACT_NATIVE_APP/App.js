import React from "react";
import Header from "./src/components/Header";
import BottomArea from "./src/components/BottomArea";
import { View, Text } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import LoginScreen from "./src/components/screens/LoginScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import SplashScreen from "./src/components/screens/SplashScreen";
import SettingScreen from "./src/components/screens/SettingScreen";
import LoginForm from "./src/components/LoginForm";

const App = () => {
  return (
    <View style={styles.viewStyle}>
      <Header headerText="Stay Smart" />
      <BottomArea />
      <LoginForm />
    </View>
  );
};

const styles = {
  viewStyle: {
    height: 710,
    backgroundColor: "black"
  }
};

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: () => {
        return <Icon name="home" size={30} color="#900" />;
        // return <Text>Skadjiaj</Text>;
      }
    }
  },
  Settings: {
    screen: SettingScreen,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: () => {
        return <Icon name="cog" size={30} color="#900" />;
      }
    }
  }
});

const SwitchNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Login: LoginScreen,
    App: TabNavigator
  },
  {
    initialRouteName: "Splash"
  }
);

export default createAppContainer(SwitchNavigator);
