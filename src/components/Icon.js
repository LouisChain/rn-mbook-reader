
import React from 'react'

import { createIconSet } from 'react-native-vector-icons'

import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
// import { m3IconName, Mingalabar } from '@components/Mingalabar'
import PropTypes from "prop-types"

export default class Icon extends React.PureComponent {

  static DEFAULT_ICON_SET = "MaterialIcons"//m3IconName;

  static ICON_SETS = { Entypo, EvilIcons, Feather, FontAwesome, Foundation, Ionicons, MaterialIcons, MaterialCommunityIcons, Octicons, Zocial, SimpleLineIcons };

  static addIconSet = (iconSet, glyphMap, fontFamily, fontFile) => {
    Icon.ICON_SETS[iconSet] = createIconSet(glyphMap, fontFamily, fontFile)
  }

  static setDefaultIconSet = (iconSet) => {
    Icon.DEFAULT_ICON_SET = iconSet
  }

  static propTypes = {
    active: PropTypes.bool,
    color: PropTypes.string,
    focus: PropTypes.bool,
    name: PropTypes.string.isRequired,
    set: PropTypes.string,
    size: PropTypes.number
  }

  static defaultProps = {
    active: true,
    focus: false,
  }

  static contextTypes = {
    appTheme: PropTypes.object
  }

  render() {
    const { appTheme } = this.context;
    const color = this._getColor();
    const size = this.props.size || appTheme.icon.size
    const IconView = Icon.ICON_SETS[this.props.set || Icon.DEFAULT_ICON_SET]
    return (
      <IconView style={this.props.style}
        color={color}
        name={this.props.name}
        size={size} />
    )
  }

  _getColor = () => {
    const { appTheme } = this.context;
    return this.props.color || appTheme.icon.normal;
  }
}