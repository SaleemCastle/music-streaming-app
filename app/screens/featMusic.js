import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image
} from "react-native";
import { Card } from "react-native-paper";
import { Constants } from "expo-constants";
import { createAppContainer } from "@react-navigation/native";
import { createStackNavigator } from "react-navigation-stack";

import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

import ArtistPage from "./artistPage";
let searchParam = "ed sheeran";
let method = "GET";
let host = "deezerdevs-deezer.p.rapidapi.com";
let key_deezer = "61d1511b51msh3be6e8ce4d067e0p1aff51jsn9b5331e53ad4";

class FeaturedMusic extends Component {
  static navigationOptions = {
    title: "Featured Music",
    headerRight: <View />
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: []
    };
  }
  componentDidMount() {
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchParam, {
      method: method,
      headers: {
        "x-rapidapi-host": host,
        "x-rapidapi-key": key_deezer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          isLoading: false,
          data: responseData.data
        });
      });
  }
  _renderItem = ({ item }) => {
    return (
      <Card style={{ flex: 1, flexDirection: "row", padding: 10, margin: 10 }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Artist", { item: item })
          }
        >
          <View style={{ ...styles.item, flex: 1, flexDirection: "row" }}>
            <Image
              source={{ uri: item.album.cover_medium }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <Text style={styles.albumText}>{item.album.title}</Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ ...styles.container, alignItems: "center" }}>
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <FlatList
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index}
            />
          </ScrollView>
        </View>
      );
    }
  }
}

export default FeaturedMusic;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    overflow: "hidden"
  },
  albumText: {
    marginLeft: 20,
    fontSize: 18,
    color: "#6b6b69",
    flex: 1,
    flexWrap: "wrap"
  }
});
