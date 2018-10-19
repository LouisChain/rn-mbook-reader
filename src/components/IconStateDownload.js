import React, { PureComponent } from "react"
import { Button, Right } from 'native-base';
import Icon from "@components/Icon"
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import PropTypes from "prop-types"
import * as DownloadManager from "@utils/downloadManager";

export default class IconStateDownload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      downloaded: false,
      progress: 0,
      fileError: false
    }
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }

  componentDidMount() {
    let { url, id } = this.props;
    // Check if file is downloaded?
    DownloadManager.wasDownloaded(url, id)
      .then(res => {
        this.setState({ downloaded: res })
      })
    // Check if has instance downloading...
    let instance = DownloadManager.get(url);
    if (instance) {
      instance
        .progress({ count: 10 }, (received, total) => {
          // console.log('>>> Download progress: ', received / total)
          this.setState({ progress: (received / total) * 100 })
        })
        .then(response => {
          // console.log(">>> Download completed path: " + response.path());
          this.setState({ progress: 100, downloaded: true })
          DownloadManager.remove(url);
        })
        .catch(error => {
          console.log(">>> Download error " + error);
          DownloadManager.remove(url);
        })
    }
  }

  downloadFile = () => {
    let { url, id } = this.props;
    DownloadManager.wasDownloaded(url, id)
      .then(res => {
        if (!res) {
          DownloadManager.download(url, id)
            .progress({ count: 10 }, (received, total) => {
              // console.log('>>> Download progress: ', received / total)
              this.setState({ progress: (received / total) * 100 })
            })
            .then(response => {
              // console.log(">>> Download completed path: " + response.path());
              this.setState({ progress: 100, downloaded: true })
              DownloadManager.remove(url);
            })
            .catch(error => {
              console.log(">>> Download error " + error);
              DownloadManager.remove(url);
              this.setState({ fileError: true })
            })
        }
      })
      .catch(error => {
        console.log("Error check exist " + error)
      })
  }

  render() {
    return (
      <Right style={{ maxWidth: 32 }}>
        {
          (this.state.progress <= 0 || this.state.progress >= 100) ?
            <Button transparent
              onPress={() => this.downloadFile()}
            >
              {
                this.state.downloaded ?
                  <Icon set="SimpleLineIcons" name="check" color="gray" /> :
                  (this.state.fileError ?
                    <Icon set="MaterialIcons" name="error" color="gray" /> :
                    <Icon set="MaterialIcons" name="file-download" color="#bbb" />)
              }
            </Button> :
            <AnimatedCircularProgress
              size={32}
              width={2}
              fill={this.state.progress}
              tintColor="#3f3f3f"
              backgroundColor="#bbb" />
        }
      </Right>
    )
  }
}