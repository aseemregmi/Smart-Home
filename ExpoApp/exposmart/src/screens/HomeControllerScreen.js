import React, { Component } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { connect } from "react-redux";
import { Header } from "react-native-elements";
import { deviceAdded, onSwitchValueChange } from "../Actions";

class HomeControllerScreen extends Component {
  state = { gadgets: null };

  componentDidMount() {
    this.props.deviceAdded(this.props.username);
    console.log(this.props);
  }

  renderGadgets = () => {
    if (this.props.gadgets.length > 0) {
      return this.props.gadgets.map(item => (
        <View
          key={item.gadget_id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 22,
              marginBottom: 10,
              marginTop: 10
            }}
          >
            {item.gadget_name}
          </Text>
          <Switch
            onValueChange={value =>
              this.props.onSwitchValueChange(item.gadget_id, item.rpi_id, value)
            }
            value={item.status}
            style={{ marginBottom: 20, marginRight: 10 }}
          />
        </View>
      ));
    }
    return <Text>Loading</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: "MY GADGETS", style: { color: "#fff" } }}
        />
        {this.renderGadgets()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    gadgets: state.widget.devices
  };
};

export default connect(
  mapStateToProps,
  { deviceAdded, onSwitchValueChange }
)(HomeControllerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
