import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";
import { Login } from "../Actions";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "aseemregmi", password: "password123" };

    if (props.login.loggedIn) {
      props.navigation.navigate("DashBoard");
    }
  }

  onButtonPress = () => {
    const { email, password } = this.state;
    this.props.Login(email, password);
  };

  componentDidUpdate() {
    if (this.props.login.loggedIn) {
      this.props.navigation.navigate("DashBoard");
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          </Item>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={this.onButtonPress}
          >
            <Text>Log In</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
export default connect(
  state => {
    return { login: state.login };
  },
  { Login }
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  }
});
