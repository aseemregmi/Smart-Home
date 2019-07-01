import React, { Component } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import { Button, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { Logout } from "../Actions";

const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * DEVICE_WIDTH;

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          // this.props.navigation.actions.navigate("third");
          this.props.screenProps.handleNavigation("third");
        }
      }
    });
    this.panResponder = panResponder;
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          {...this.panResponder.panHandlers}
          style={{
            height: DEVICE_HEIGHT,
            width: DEVICE_WIDTH,
            backgroundColor: "white"
          }}
        >
          <Avatar
            containerStyle={styles.avatarStyle}
            rounded
            size="large"
            title="Photo"
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
            }}
          />
          <Button
            title="Logout"
            buttonStyle={{
              backgroundColor: "blue",
              //width: "100%",
              marginTop: 40,
              paddingLeft: 80,
              paddingRight: 80
            }}
            onPress={() => {
              this.props.Logout();
            }}
          />
          <Button
            title="About Us"
            buttonStyle={{
              backgroundColor: "green",
              //width: "100%",
              paddingLeft: 70,
              paddingRight: 70,
              marginTop: 60
            }}
            onPress={() => {
              this.props.navigation.navigate("aboutUs");
            }}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { Logout }
)(SettingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  avatarStyle: {
    alignSelf: "flex-end",
    marginLeft: 20,
    marginTop: 30,
    marginRight: 20
  }
});
