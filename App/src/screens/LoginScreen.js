import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  StyleSheet,
  AsyncStorage,
  View,
  ActivityIndicator
} from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import { Input, Button } from "react-native-elements";
import { Login } from "../Actions";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", showSpinner: false };

    if (props.login.loggedIn) {
      props.navigation.navigate("DashBoard");
    }
  }

  onButtonPress = () => {
    const { email, password } = this.state;
    this.props.Login(email, password);
    this.setState({ showSpinner: true });
  };

  componentDidUpdate() {
    if (this.props.login.loggedIn) {
      this.props.navigation.navigate("DashBoard");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          autoCapitalize="none"
          onChangeText={text => this.setState({ password: text })}
        />
        {this.props.showLoginSpinner ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="Login" onPress={this.onButtonPress} />
        )}
      </View>
    );
  }
}
export default connect(
  state => {
    return {
      login: state.login,
      showLoginSpinner: state.login.showLoginSpinner
    };
  },
  { Login }
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
});
