import React, { PureComponent } from "react"
import {
  View, Text, Button
} from 'native-base';
import { Slider as Slider1 } from "react-native"
import { Slider, Avatar } from "react-native-elements"
import PropTypes from "prop-types"
import Icon from "@components/Icon"

export default class Player extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  }

  static propTypes = {
    book: PropTypes.object
  }

  onPlayPrevious = () => {

  }

  onPlay = () => {
    
  }

  onPlayNext = () => {

  }

  render() {
    let { appTheme } = this.context;
    let { title, author, cover, coverLink, mbookLink } = this.props.book;
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <View style={{ padding: 16 }}>
          <Text numberOfLines={2} style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>{title}</Text>
          <Text numberOfLines={2} style={{ color: 'gray', fontSize: 16, marginVertical: 16, textAlign: 'center' }}>{author}</Text>
          <Avatar
            xlarge
            rounded
            source={{ uri: coverLink || cover }}
            activeOpacity={0.7}
            containerStyle={{ alignSelf: 'center' }} />
          <Slider maximumValue={100} value={20} />
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>Bạn đã nghe 4 trong tổng số 14 chương</Text>
        </View>
        <View>
          <Slider1 maximumValue={100} value={10} minimumTrackTintColor='#3f3f3f' />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 14 }}>00:15</Text>
            <Text style={{ fontSize: 14 }}>01:19:33</Text>
          </View>
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14, marginTop: 8 }}>{mbookLink[2].title}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 8 }}>
          <Button transparent
            onPress={() => this.onPlayPrevious()}
          >
            <Icon name='skip-previous' set='MaterialIcons' size={38} />
          </Button>
          <Button transparent
            onPress={() => this.onPlay()}
          >
            <Icon name='play-arrow' set='MaterialIcons' size={38} />
          </Button>
          <Button transparent
            onPress={() => this.onPlayNext()}
          >
            <Icon name='skip-next' set='MaterialIcons' size={38} />
          </Button>
        </View>
        <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 8 }}>Đang khởi tạo...</Text>
      </View>
    );
  }
}