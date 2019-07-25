import React from "react";
import { ScrollView } from "react-native";

class PatchedScrollView extends React.PureComponent {
  componentDidMount() {
    // Dirty hack
    this._scrollView.scrollResponderHandleStartShouldSetResponder = () => true;
  }

  render() {
    return (
      <ScrollView ref={x => (this._scrollView = x)} {...this.props}>
        {this.props.children}
      </ScrollView>
    );
  }
}

export default PatchedScrollView;
