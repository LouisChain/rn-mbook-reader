import React, { PureComponent } from "react";
import { View, Text } from "native-base";
import Slider from "react-native-slider";
import { secondToHMS } from "@utils/string";
import PropTypes from "prop-types";
import * as SoundManager from "@utils/soundManager";

export default class AudioTimer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playAt: 0,
      slideAt: 0
    };
    this.timeout = null;
  }

  static propTypes = {
    playing: PropTypes.bool,
    duration: PropTypes.number,
    title: PropTypes.string
  };

  componentWillReceiveProps(nextProps) {
    let duration = nextProps.duration;
    if (duration === 0) {
      this.initial();
    }
  }

  onSlidingComplete = value => {
    let duration = this.props.duration;
    let slidingTime = Math.floor((value * duration) / 100);
    let Sound = SoundManager.CurrentSound;
    if (Sound) {
      Sound.setCurrentTime(slidingTime);
      this._clearTimeout(this.timeout);
      this.setState({ playAt: slidingTime, slideAt: value });
    }
  };

  _clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  initial = () => {
    this._clearTimeout();
    this.setState({
      playAt: 0,
      slideAt: 0
    });
  };

  render() {
    let playAt = this.state.playAt;
    let slideAt = this.state.slideAt;
    let { duration, playing, title } = this.props;
    if (playing && playAt < duration) {
      this.timeout = setTimeout(() => {
        this.setState({
          playAt: playAt + 1,
          slideAt: ((playAt + 1) * 100) / duration
        });
      }, 1000);
    }
    return (
      <View>
        <Slider
          maximumValue={100}
          value={slideAt}
          minimumTrackTintColor="#3f3f3f"
          thumbTintColor="white"
          trackStyle={{ height: 2 }}
          thumbStyle={{
            borderColor: "#3f3f3f",
            borderWidth: 2,
            width: 30,
            height: 30,
            borderRadius: 60
          }}
          onSlidingComplete={this.onSlidingComplete}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 14 }}>{secondToHMS(playAt)}</Text>
          <Text style={{ fontSize: 14 }}>{secondToHMS(duration)}</Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: 14,
            marginTop: 8
          }}
        >
          {title}
        </Text>
      </View>
    );
  }
}
