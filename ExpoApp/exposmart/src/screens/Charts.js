import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { PieChart } from "react-native-svg-charts";
import axios from "axios";

class Charts extends Component {
  state = {
    startDate: null,
    startDatePickerVisible: false,
    endDate: null,
    endDatePickerVisible: false,
    chartData: null
  };

  showStartDateTimePicker = () => {
    this.setState({ startDatePickerVisible: true });
  };

  showEndDatePicker = () => {
    this.setState({ endDatePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({
      endDatePickerVisible: false,
      startDatePickerVisible: false
    });
  };

  handleStartDateConfirm = date => {
    this.setState({ startDate: date, startDatePickerVisible: false });
  };

  handleEndDateConfirm = date => {
    this.setState({ endDate: date, endDatePickerVisible: false });
  };

  handleDateTimeSubmit = () => {
    const { startDate, endDate } = this.state;
    if (startDate === null || endDate === null) {
      alert("Select Start And End Date Properly");
      return null;
    }
    axios
      .get(
        `http://192.168.1.83:3000/api/energy-consumed/${this.props.username}`,
        {
          params: {
            starting_datetime: new Date(startDate).toUTCString(),
            ending_datetime: new Date(endDate).toUTCString()
          }
        }
      )
      .then(res => {
        this.handleRawDataGadgetWise(res.data);
      })
      .catch(err => {
        alert("Error Occurred");
      });
  };

  handleRawDataGadgetWise = rawData => {
    let gadgetWiseData = new Object();

    rawData.map(data => {
      if (Object.keys(gadgetWiseData).indexOf(String(data.gadget_id)) === -1) {
        gadgetWiseData[data.gadget_id] = new Array();
        gadgetWiseData[data.gadget_id].push(data);
      } else {
        gadgetWiseData[data.gadget_id].push(data);
      }
    });

    let gadgetWiseUnitsConsumption = new Object();
    Object.keys(gadgetWiseData).map(key => {
      const arrayOfGadgetData = gadgetWiseData[key];
      let deviceRunTime = 0;
      arrayOfGadgetData.map(gadgetData => {
        let runTime =
          (new Date(gadgetData.ending_datetime).getTime() -
            new Date(gadgetData.starting_datetime).getTime()) /
          (1000 * 60 * 60);
        deviceRunTime += runTime;
      });
      const power = arrayOfGadgetData[0].power / 1000;
      const unitsConsumed = power * deviceRunTime;
      gadgetWiseUnitsConsumption[key] = {
        unitsConsumed,
        gadgetName: arrayOfGadgetData[0].gadget_name,
        gadgetId: arrayOfGadgetData[0].gadget_id
      };
    });

    const chartData = Object.keys(gadgetWiseUnitsConsumption).map(
      (key, index) => {
        value = gadgetWiseUnitsConsumption[key].unitsConsumed;
        name = gadgetWiseUnitsConsumption[key].gadgetName;
        return {
          value: Math.round(value),
          name,
          key: `pie-${name + value}`,
          svg: {
            fill: (
              "#" +
              ((Math.random() * 0xffffff) << 0).toString(16) +
              "000000"
            ).slice(0, 7),
            onPress: () => {
              alert(
                `Gadget Name : ${
                  this.state.chartData[index].name
                }\nUnits Consumed : ${this.state.chartData[index].value} `
              );
            }
          }
        };
      }
    );

    this.setState({ chartData });
  };

  render() {
    // }
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Button
            title={
              this.state.startDate
                ? this.state.startDate.toLocaleString()
                : "Select Start DateTime"
            }
            onPress={this.showStartDateTimePicker}
          />
          <DateTimePicker
            mode="datetime"
            isVisible={this.state.startDatePickerVisible}
            onConfirm={this.handleStartDateConfirm}
            onCancel={this.hideDateTimePicker}
          />
        </View>
        <View>
          <Button
            title={
              this.state.endDate
                ? this.state.endDate.toLocaleString()
                : "Select End DateTime"
            }
            onPress={this.showEndDatePicker}
          />
          <DateTimePicker
            mode="datetime"
            isVisible={this.state.endDatePickerVisible}
            onConfirm={this.handleEndDateConfirm}
            onCancel={this.hideDateTimePicker}
          />
        </View>
        <View>
          <Button title="Submit" onPress={this.handleDateTimeSubmit} />
        </View>
        <View>
          {this.state.chartData ? (
            <View>
              <PieChart
                style={{ height: 500 }}
                data={this.state.chartData}
                innerRadius="20%"
              />
            </View>
          ) : (
            <Text>Please Select Date First To Get Energy Consumed Data</Text>
          )}
        </View>
      </View>
    );
  }
}

export default Charts;
