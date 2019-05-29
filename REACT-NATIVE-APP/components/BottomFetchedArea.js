import React from "react";
import { Text, View } from "react-native";

const BottomFetchedArea = props => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{props.data}</Text>
    </View>
  );
};

const styles = {
  textStyle: {
    color: "white",
    fontSize: 22
  },
  viewStyle: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  }
};
export default BottomFetchedArea;
