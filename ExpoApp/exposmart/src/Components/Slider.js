import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

class Slider extends Component {
  renderButton = (data, index) => {
    if (index === 0) {
      return (
        <Button
          title="Skip tutorial"
          buttonStyle={{ backgroundColor: "#3D9970", marginTop: 60 }}
          onPress={this.props.onSkipButtonPressed}
        />
      );
    }
    if (index === data.length - 1) {
      return (
        <Button
          title="I'm Ready"
          buttonStyle={{
            backgroundColor: `data[${index}].color`,
            marginTop: 60
          }}
          onPress={this.props.onSkipButtonPressed}
        />
      );
    }
  };
  renderSlides = data => {
    return data.map((datum, index) => {
      return (
        <View
          key={datum.text}
          style={[styles.viewStyle, { backgroundColor: datum.color }]}
        >
          <Text style={styles.textStyle}>{datum.text}</Text>
          <Icon
            name="compare-arrows"
            type="material"
            color="#355A3F"
            size={50}
          />
          {this.renderButton(data, index)}
        </View>
      );
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator>
          {this.renderSlides(this.props.data)}
        </ScrollView>
      </View>
    );
  }
}
export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  textStyle: {
    fontSize: 40,
    width: SCREEN_WIDTH,
    textAlign: "center",
    color: "white"
  },
  viewStyle: {
    justifyContent: "center",
    alignItems: "center"
  }
});
