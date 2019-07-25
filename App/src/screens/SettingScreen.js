import React, { Component } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Button, Avatar, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Logout } from "../Actions";

const list = [
  {
    name: "Niranjan Pant",
    avatar_url:
      "https://scontent.fktm6-1.fna.fbcdn.net/v/t1.0-9/53283514_2127837877299787_7089704486897188864_n.jpg?_nc_cat=110&_nc_ht=scontent.fktm6-1.fna&oh=8719340ac465a47be1e5efc9ea6edcc1&oe=5D9B0CE3",
    subtitle: "Username"
  }
];
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
          <TouchableOpacity>
            <ListItem
              leftAvatar={{
                source: {
                  uri:
                    "https://scontent.fktm6-1.fna.fbcdn.net/v/t1.0-9/53283514_2127837877299787_7089704486897188864_n.jpg?_nc_cat=110&_nc_ht=scontent.fktm6-1.fna&oh=8719340ac465a47be1e5efc9ea6edcc1&oe=5D9B0CE3"
                }
              }}
              title={this.props.username}
              subtitle="User"
            />
          </TouchableOpacity>
          <Button
            title="Logout"
            buttonStyle={{
              backgroundColor: "grey",
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
              backgroundColor: "grey",
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

mapStateToProps = state => {
  return {
    username: state.login.username
  };
};

export default connect(
  mapStateToProps,
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
