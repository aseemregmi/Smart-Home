import React from "react";
import { View } from "react-native";
import BottomButtonArea from "./BottomButtonArea";
import BottomFetchedArea from "./BottomFetchedArea";

const BottomArea = () => {
  return (
    <View>
      <BottomButtonArea />
      <BottomFetchedArea />
    </View>
  );
};

export default BottomArea;
