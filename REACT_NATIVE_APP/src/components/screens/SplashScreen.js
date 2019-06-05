import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

class SplashScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("App");
    }, 100);
  }

  render() {
    return (
      <View>
        <Text>Splash Screen</Text>
      </View>
    );
  }
}

export default SplashScreen;
