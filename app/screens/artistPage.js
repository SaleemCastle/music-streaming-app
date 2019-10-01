import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList
} from "react-native";
import { Constants } from "expo-constants";
import { Card } from "react-native-paper";
import Svg, { Circle, ClipPath } from "react-native-svg";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

let method = "GET";
let host = "deezerdevs-deezer.p.rapidapi.com";
let key_deezer = "61d1511b51msh3be6e8ce4d067e0p1aff51jsn9b5331e53ad4";
let limit = 10;
let artistID = 384236;
class ArtistPage extends Component(props) {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: []
    };
  }
  //Return to previous screen
  _onSwipeLeft() {
    this.props.navigation.pop();
  }
  componentDidMount() {
    fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/artist/" +
        artistID +
        "/top?limit=" +
        limit,
      {
        method: method,
        headers: {
          "x-rapidapi-host": host,
          "x-rapidapi-key": key_deezer
        }
      }
    )
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
      <Card
        style={{
          flex: 1,
          flexDirection: "row",
          padding: 10,
          margin: 3,
          elevation: 3,
          backgroundColor: "#f5f4f4"
        }}
      >
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Player", { item: item })
          }
        >
          <View style={{ ...styles.item, flex: 1, flexDirection: "row" }}>
            <Image
              source={{ uri: item.album.cover_medium }}
              style={{ width: 50, height: 50, borderRadius: 5 }}
            />
            <Text style={styles.albumText}>{item.title}</Text>
            <View style={{ alignSelf: "center", height: 32, width: 32 }}>
              <Image
                source={require("../../assets/playlist.png")}
                style={{ height: 32, width: 32 }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };
  render() {
    const { navigation } = this.props;

    //let artistID = navigation.getParam('item').artist.id
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Svg height={height / 2} width={width}>
            <Circle
              cx={width / 2}
              cy={-height / 12}
              r={width / 1.5}
              fill="#fecfbf"
            />
          </Svg>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              ...StyleSheet.absoluteFillObject,
              top: -300,
              elevation: 20
            }}
          >
            <Image
              source={require("../../assets/ed.png")}
              style={{
                width: 250,
                height: 250,
                borderRadius: 125,
                elevation: 4
              }}
            />
            <View
              style={{
                width: width - 200,
                height: 1,
                elevation: 5,
                borderRadius: 100,
                opacity: 0.1,
                backgroundColor: "#777",
                marginTop: 10
              }}
            ></View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <ScrollView>
              <FlatList
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index}
              />
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

export default ArtistPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  albumText: {
    marginLeft: 20,
    fontSize: 18,
    color: "#6b6b69",
    flex: 1,
    flexWrap: "wrap"
  }
});
