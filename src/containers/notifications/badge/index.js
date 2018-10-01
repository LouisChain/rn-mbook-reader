import React from "react"
import { View, Text } from "react-native"
import Icon from "@components/Icon";
import IconBadge from 'react-native-icon-badge';
import { connect } from "react-redux";

const NotiTabBarIcon = (props) => (
  <IconBadge
    MainElement={
      <View style={styles.container} >
        <Icon set={props.set} name={props.name} size={props.size} color={props.tintColor} />
      </View>
    }
    BadgeElement={<Text style={styles.text}>{getCount(props.Key, props.message)}</Text>}
    IconBadgeStyle={
      styles.badge
    }
    Hidden={isHidden(props.Key, props.message)}
  />
);

getCount = (key, message) => {
  for (i = 0; i < message.length; i++) {
    if (key === message[i].key) {
      return message[i].count;
    }
  }
  return 0;
}

isHidden = (key, message) => {
  for (i = 0; i < message.length; i++) {
    if (key === message[i].key && message[i].count > 0) {
      return false;
    }
  }
  return true;
}

const styles = {
  container: {
    width: 24,
    height: 24,
    bottom: -4
  },
  text: {
    color: 'white',
    fontSize: 10
  },
  badge: {
    left: 20,
    top: -4
  }
}

const mapStateToProps = (state) => ({
  message: state.notifications.message,
})

export default connect(mapStateToProps)(NotiTabBarIcon);