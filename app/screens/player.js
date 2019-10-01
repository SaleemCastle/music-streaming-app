import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { Constants } from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

class Player extends Component {
  static navigationOptions = {
    title: "Now Playing",
    headerRight: (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon name="sliders-h" size={22} color="#fff" />
      </View>
    )
  };

  render() {
    const { navigation } = this.props;
    let data = navigation.getParam("item");
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 3,
            width: width,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={{ uri: data.album.cover_big }}
            style={{
              ...StyleSheet.absoluteFill,
              height: null,
              width: null,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.3,
              elevation: 10
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            zIndex: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            ...StyleSheet.absoluteFillObject,
            top: -height / 4,
            elevation: 20
          }}
        >
          <TouchableOpacity>
            <Image
              source={{ uri: data.album.cover_big }}
              style={{
                height: 250,
                width: 250,
                borderRadius: 125,
                elevation: 10
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 5,
            backgroundColor: "#fff",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              zIndex: 100,
              color: "#ccc",
              marginVertical: 30,
              textAlign: "center"
            }}
          >
            {data.title}
          </Text>
          <View
            style={{
              position: "relative",
              height: 5,
              width: width - 50,
              backgroundColor: "#ccc",
              borderRadius: 2.5,
              flexDirection: "row",
              marginVertical: 30
            }}
          >
            <Text style={{ position: "absolute", top: -30, right: 0 }}>
              2:48
            </Text>
            <Text style={{ position: "absolute", top: -30, left: 0 }}>
              3:30
            </Text>
            <View
              style={{
                flex: 0.8,
                height: 5,
                width: null,
                backgroundColor: "#6a6ac0",
                borderRadius: 2.5
              }}
            >
              <View
                style={{
                  height: 15,
                  width: 15,
                  borderRadius: 7.5,
                  position: "absolute",
                  right: 0,
                  elevation: 10,
                  backgroundColor: "#fff",
                  zIndex: 100,
                  justifySelf: "center",
                  alignSelf: "center",
                  top: -5
                }}
              ></View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: width - 50,
              justifyContent: "space-around",
              alignItems: "center",
              marginVertical: 30
            }}
          >
            <View>
              <TouchableOpacity>
                <Icon
                  name="microphone"
                  size={22}
                  color="#6a6ac0"
                  style={{ elevation: 10 }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Icon
                name="fast-backward"
                size={22}
                color="#6a6ac0"
                style={{ elevation: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#6a6ac0",
                  elevation: 10,
                  borderRadius: 30,
                  height: 60,
                  width: 60,
                  padding: 30
                }}
              >
                <Icon
                  name="play"
                  size={22}
                  color="#fff"
                  style={{ zIndex: 10 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="fast-forward"
                size={22}
                color="#6a6ac0"
                style={{ elevation: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="random"
                size={22}
                color="#6a6ac0"
                style={{ elevation: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Player;
const styles = StyleSheet.create({});
