//Imports

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Button,
  ScrollView
} from "react-native";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import Constants from "expo-constants";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { createAppContainer } from "@react-navigation/native";
import { createStackNavigator } from "react-navigation-stack";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

//Compomnents

import FeaturedMusic from "./app/screens/featMusic";
import ArtistScreen from "./app/screens/artistPage";
import PlayerScreen from "./app/screens/player";

//Youtube API params

// let part = 'snippet';
// let q = 'ed';
// let key = 'AIzaSyC0Tg8VDGNNDaqr3WIKTuHyrHkLJUK0wDo';
// let maxResults = 5;

// Deezer API params
let searchParam = "ed sheeran";
let method = "GET";
let host = "deezerdevs-deezer.p.rapidapi.com";
let key_deezer = "61d1511b51msh3be6e8ce4d067e0p1aff51jsn9b5331e53ad4";

const { width, height } = Dimensions.get("window");
const {
  Value,
  event,
  block,
  eq,
  set,
  cond,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 800,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position
  ]);
}

//Music App Container

class MusicApp extends Component {
  constructor() {
    super();
    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);
    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);
    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }
  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#fff", justifyContent: "flex-end" }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
          <Svg height={height + 40} width={width}>
            <ClipPath id="clip">
              <Circle r={height + 40} cx={width / 2} />
            </ClipPath>
            <Image
              href={require("./assets/music.jpg")}
              width={width}
              height={height + 40}
              preserveAspectRatio="xMidYmid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={{ height: height / 3, justifyContent: "center" }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: "#3b5998",
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
              SIGN IN WITH FACEBOOK
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              height: height / 3,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: "center",
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }]
            }}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{ rotate: concat(this.rotateCross, "deg") }]
                  }}
                >
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              style={styles.textInput}
              placeholder="EMAIL"
              placeholderTextColor="#b5b5d9"
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="PASSWORD"
              placeholderTextColor="#b5b5d9"
            ></TextInput>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Landing")}
            >
              <Animated.View style={{ ...styles.signinBtn }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                >
                  SIGN IN
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class AppScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require("./assets/music.jpg")]);

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <MusicApp navigation={this.props.navigation} />;
  }
}
// App Navigator

const AppNavigator = createStackNavigator(
  {
    Home: AppScreen,
    Landing: FeaturedMusic,
    Artist: ArtistScreen,
    Player: PlayerScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#6a6ac0"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    height: 50,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  signinBtn: {
    backgroundColor: "#6a6ac0",
    height: 50,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -30,
    left: width / 2 - 20,
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  textInput: {
    height: 50,
    borderRadius: 1,
    borderWidth: 0,
    textAlign: "center",
    marginHorizontal: 20,
    backgroundColor: "#f1f1f1",
    paddingLeft: 10,
    marginVertical: 5
  }
});
