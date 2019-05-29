import React from "react";
import { View, Text } from "react-native";
import Button from "./Button";
import BottomFetchedArea from "./BottomFetchedArea";

class BottomButtonArea extends React.Component {
  state = { status: false };

  componentDidMount() {
    fetch("http://192.168.43.84:3000/")
      .then(res => res.json())
      .then(response => {
        if (response.currentStatus == 1) {
          console.log(response);
          this.setState({ status: true });
        }
      })
      .catch(err => console.log());
  }

  render() {
    return (
      <View>
        <Text style={{ color: "white", paddingLeft: 10 }}>
          Your device is currently {this.state.status ? "ON" : "OFF"}
        </Text>
        <Button
          afterPress={async () => {
            try {
              const res = await fetch("http://192.168.43.84:3000/on", {
                method: "POST"
              });
              this.setState({ status: true });
            } catch (err) {
              console.log();
            }
          }}
        >
          <Text>Onn</Text>
        </Button>
        <Button
          afterPress={async () => {
            try {
              const res = await fetch("http://192.168.43.84:3000/off", {
                method: "POST"
              });
              console.log(res);
              this.setState({ status: false });
            } catch (err) {
              console.log();
            }

            // this.setState({ data: respo });
          }}
        >
          <Text>Offf</Text>
        </Button>
        <BottomFetchedArea data={this.state.data} />
      </View>
    );
  }
}

export default BottomButtonArea;
