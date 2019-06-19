import React from "react";
import { TextInput, View } from "react-native";

class LoginForm extends React.Component {
  state = { input: "" };

  render() {
    return (
      <View>
        <TextInput style={styles.inputStyle} onChangeText={this.onChangeText} />
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    height: 30,
    width: "100%",
    backgroundColor: "red"
  }
};

export default LoginForm;
