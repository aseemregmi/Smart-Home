import React, { Component } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { Header } from "react-native-elements";

class HomeControllerScreen extends Component {
  state = { gadgets: null };

  onSwitchValueChange = (gadget_id, rpi_id, value) => {
    axios
      .post(`http://192.168.100.10:3000/api/gadget/${value ? "on" : "off"}`, {
        gadget_id,
        rpi_id
      })
      .then(() => {
        let newGadgetsState = this.state.gadgets.map(gadget => {
          if (gadget.gadget_id === gadget_id) {
            gadget.status = value;
          }
          return gadget;
        });
        this.setState({ gadgets: newGadgetsState });
      })
      .catch(err => console.log(err));
  };

  renderGadgets = () => {
    if (this.state.gadgets === null) {
      return <Text>Loading</Text>;
    }
    return this.state.gadgets.map(item => (
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
            this.onSwitchValueChange(item.gadget_id, item.rpi_id, value)
          }
          value={item.status}
          style={{ marginBottom: 20, marginRight: 10 }}
        />
      </View>
    ));
  };

  componentDidMount() {
    axios
      .get(`http://192.168.100.10:3000/api/gadget/${this.props.username}`)
      .then(res => this.setState({ gadgets: res.data }))
      .catch(err => console.log(err));
  }

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
    username: state.login.username
  };
};

export default connect(mapStateToProps)(HomeControllerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
