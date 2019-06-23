import React, { Component } from "react";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";

const tryEmail = "skandaaryal2055@gmail.com";
const tryPassword = "nepal";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  onButtonPress = async () => {
    if (this.state.email === tryEmail && this.state.password === tryPassword) {
      await AsyncStorage.setItem("LoggedIn", "1");
      this.props.navigation.navigate("DashBoard");
    } else {
      alert("Username or Password is incorrect");
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={text => this.setState({ email: text })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
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
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  }
});
