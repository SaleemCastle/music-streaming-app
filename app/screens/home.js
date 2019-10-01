import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, TextInput } from "react-native";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import { Constants } from "expo-constants";

import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

class Home extends Component {
  static navigationOptions = {
    title: "Featured Music",
    headerRight: <View />
  };

  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#fff", justifyContent: "flex-end" }}
      >
        <Text>Landing Home</Text>
      </View>
    );
  }
}

export default Home;
const styles = StyleSheet.create({});
