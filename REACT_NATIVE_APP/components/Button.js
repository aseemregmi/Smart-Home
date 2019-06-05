import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = props => {
  return (
    <TouchableOpacity onPress={props.afterPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20
  },
  textStyle: {
    alignSelf: "center",
    color: "#007aff",
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  }
};

export default Button;
