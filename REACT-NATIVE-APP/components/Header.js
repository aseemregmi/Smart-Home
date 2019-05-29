import React from "react";
import { View, Text } from "react-native";

const Header = props => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 20,
    color: "white"
  },
  viewStyle: {
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: "black",
    elevation: 2
  }
};

export default Header;
