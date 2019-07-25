import React, { Component } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import DashBoard from "./src/screens/DashBoard";
import WelcomeScreen from "./src/screens/WelcomeScreen";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";

class App extends Component {
  renderLoading = () => {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {
    screen: WelcomeScreen
  },
  Login: {
    screen: LoginScreen
  },
  DashBoard: {
    screen: DashBoard
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

// import React, { Component } from "react";
// import { View, Text, StyleSheet } from "react-native";

// class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>App</Text>
//       </View>
//     );
//   }
// }
// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
