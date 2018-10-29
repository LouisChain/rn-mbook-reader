import React, { PureComponent } from "react";
import { View, Text, Button } from "native-base";
import { Alert } from "react-native";
import { Avatar } from "react-native-elements";
import Slider from "react-native-slider";
import PropTypes from "prop-types";
import Icon from "@components/Icon";
import AudioTimer from "@components/AudioTimer";
import * as DownloadManager from "@utils/downloadManager";
import * as SoundManager from "@utils/soundManager";
import NotifService from "@utils/NotifService";

export default class Player extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  };

  static propTypes = {
    book: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      playing: false,
      progress: 0,
      currentPlaying: 0
    };
    this.notif = new NotifService();
  }

  componentDidMount() {
    // Get last play
    this.setState({ currentPlaying: 0 });
  }

  onPlayPrevious = () => {
    DownloadManager.deleteBook(this.props.book._id);
  };

  onPlay = index => {
    if (SoundManager.isPlaying()) {
      SoundManager.pause();
      this.setState({ playing: false });
      return;
    }
    if (!SoundManager.isPlaying() && SoundManager.isLoaded()) {
      SoundManager.play(null);
      this.setState({ playing: true });
      return;
    }
    let { _id, mbookLink } = this.props.book;
    let url = mbookLink[index].media;
    this.preparePlaying();
    DownloadManager.wasDownloaded(url, _id).then(res => {
      if (res) {
        let path = DownloadManager.getPath(url, _id);
        SoundManager.init(path).then(sound => {
          SoundManager.play(success => {
            SoundManager.reset();
            this.onPlayNext();
          });
          this.setState({
            duration: sound.getDuration(),
            playing: true
          });
          this.notif.localNotif();
        });
      } else {
        this.downloadFile(index, url, _id);
      }
    });
  };

  preparePlaying = () => {
    SoundManager.release();
    this.setState({
      duration: 0,
      playing: false,
      progress: 0
    });
  };

  downloadFile = (index, url, id) => {
    DownloadManager.download(url, id)
      .progress({ count: 1 }, (received, total) => {
        // console.log('>>> Download progress: ', received / total)
        this.setState({ progress: Math.floor((received / total) * 100) });
      })
      .then(response => {
        // console.log(">>> Download completed path: " + response.path());
        this.setState({ progress: 100, downloaded: true });
        DownloadManager.remove(url);
        this.onPlay(index);
      })
      .catch(error => {
        console.log(">>> Download error " + error);
        DownloadManager.remove(url);
        this.setState({ fileError: true });
      });
  };

  onPlayNext = () => {
    let index = this.state.currentPlaying + 1;
    this.onPlay(index);
    this.setState({ currentPlaying: index });
  };

  render() {
    let { appTheme } = this.context;
    let { title, author, cover, coverLink, mbookLink } = this.props.book;
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <View style={{ padding: 16 }}>
          <Text
            numberOfLines={2}
            style={{ fontWeight: "bold", fontSize: 24, textAlign: "center" }}
          >
            {title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: "gray",
              fontSize: 16,
              marginVertical: 16,
              textAlign: "center"
            }}
          >
            {author}
          </Text>
          <Avatar
            xlarge
            rounded
            source={{ uri: coverLink || cover }}
            activeOpacity={0.7}
            containerStyle={{ alignSelf: "center" }}
          />
          <Slider
            maximumValue={100}
            value={10}
            minimumTrackTintColor="#3f3f3f"
            thumbTintColor="#3f3f3f"
            trackStyle={{ height: 2 }}
            thumbStyle={{
              width: 30,
              height: 30,
              borderRadius: 60
            }}
            onSlidingComplete={this.onSlidingComplete}
          />
          <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>
            Bạn đã nghe 4 trong tổng số 14 chương
          </Text>
        </View>
        <AudioTimer
          duration={this.state.duration}
          playing={this.state.playing}
          title={mbookLink[this.state.currentPlaying].title}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 8
          }}
        >
          <Button transparent onPress={() => this.onPlayPrevious()}>
            <Icon name="skip-previous" set="MaterialIcons" size={38} />
          </Button>
          <Button
            transparent
            onPress={() => this.onPlay(this.state.currentPlaying)}
          >
            {this.state.playing ? (
              <Icon name="pause" set="MaterialIcons" size={38} />
            ) : (
              <Icon name="play-arrow" set="MaterialIcons" size={38} />
            )}
          </Button>
          <Button transparent onPress={() => this.onPlayNext()}>
            <Icon name="skip-next" set="MaterialIcons" size={38} />
          </Button>
        </View>
        <Text style={{ textAlign: "center", fontSize: 14, marginTop: 8 }}>
          {this.state.progress === 0
            ? ""
            : "Tải về " + this.state.progress + "%"}
        </Text>
      </View>
    );
  }
}
