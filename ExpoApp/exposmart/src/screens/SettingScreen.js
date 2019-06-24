import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-elements";

class SettingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
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
            // this.navigation.navigate("login");
            console.log(this.props);
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
            // console.log(this.props);
          }}
        />
      </View>
    );
  }
}
export default SettingScreen;

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

// import React, { Component } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Button } from "react-native-elements";

// class SettingScreen extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>SettingScreen</Text>
//         <Button
//           onPress={() => this.props.navigation.navigate("aboutUs")}
//           title="press me"
//         />
//       </View>
//     );
//   }
// }
// export default SettingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
