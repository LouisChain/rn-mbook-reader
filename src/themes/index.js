
const Theme = {
  textColor: {
    primary: {
      primary: '#000000',
      primaryDark: '#FFFFFFFF',
      primaryLight: '#000000DE',
      accent: '#000000DE',
      accentDark: '#000000DE',
      accentLight: '#000000DE',
      warn: '#FFFFFFFF',
      warnDark: '#FFFFFFFF',
      warnLight: '#000000DE',
      background: '#000000DE',
      backgroundDark: '#000000DE',
      backgroundLight: '#000000DE'
    },
    secondary: {
      primary: '#FFFFFFB3',
      primaryDark: '#FFFFFFB3',
      primaryLight: '#0000008A',
      accent: '#0000008A',
      accentDark: '#0000008A',
      accentLight: '#0000008A',
      warn: '#FFFFFFB3',
      warnDark: '#FFFFFFB3',
      warnLight: '#0000008A',
      background: '#0000008A',
      backgroundDark: '#0000008A',
      backgroundLight: '#0000008A'
    },
    hint: {
      primary: '#bbb',
      primaryDark: '#FFFFFF80',
      primaryLight: '#00000061',
      accent: '#00000061',
      accentDark: '#00000061',
      accentLight: '#00000061',
      warn: '#FFFFFF80',
      warnDark: '#FFFFFF80',
      warnLight: '#00000061',
      background: '#00000061',
      backgroundDark: '#00000061',
      backgroundLight: '#00000061'
    }
  },
  palette: {
    transparent: 'transparent',
    primary: '#4ea9de',
    primaryDark: '#3FA3DD',
    primaryLight: '#66B0DB',
    accent: '#FF4081',
    accentDark: '#F50057',
    accentLight: '#FF80AB',
    warn: '#EC4058',
    warnDark: '#D91631',
    warnLight: '#F27889',
    background: '#FFFFFF',
    backgroundDark: '#EEEEEE',
    backgroundLight: '#FFFFFF'
  },
  bottomNavigation: {
    height: 56
  },
  button: {
    minWidth: 88
  },
  card: {
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0.3,
    }
  },
  dialog: {
    background: '#303030B3',
    spacing: 24
  },
  divider: {
    color: '#e1e8ee',
    size: 1
  },
  fontFamily: {
    bold: undefined,
    light: undefined,
    medium: undefined,
    regular: undefined
  },
  fontSize: {
    button: 14,
    caption: 12,
    body1: 14,
    body2: 14,
    subhead1: 16,
    subhead2: 16,
    title: 20,
    headline: 24,
    display1: 34,
    display2: 45,
    display3: 56,
    display4: 112
  },
  fontWeight: {
    button: undefined,
    caption: undefined,
    body1: undefined,
    body2: undefined,
    subhead1: undefined,
    subhead2: undefined,
    title: undefined,
    headline: undefined,
    display1: undefined,
    display2: undefined,
    display3: undefined,
    display4: undefined
  },
  color: {
    activeColor: '#ea8024',
    inactiveColor: '#7f7f7f',
    normal: 'black'
  },
  icon: {
    size: 24,
    sizeSm: 16,
    activeColor: '#ea8024',
    inactiveColor: '#7f7f7f'
  },
  layout: {
    spacing: 16,
    spacingLg: 32,
    spacingSm: 8,
    spacingXs: 4
  },
  lineHeight: {
    button: 20,
    caption: 18,
    body1: 20,
    body2: 24,
    subhead1: 24,
    subhead2: 28,
    title: 30,
    headline: 32,
    display1: 40,
    display2: 48,
    display3: 60,
    display4: 120
  },
  list: {
    avatarSize: 40,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    singleLineTextOnlyHeight: 48,
    singleLineIconWithTextHeight: 48,
    singleLineAvatarWithTextHeight: 56,
    singleLineAvatarWithTextAndIconHeight: 56,
    twoLineTextOnlyHeight: 72,
    twoLineIconWithTextHeight: 72,
    twoLineAvatarWithTextHeight: 72,
    twoLineAvatarWithTextAndIconHeight: 72,
    threeLineTextOnlyHeight: 88,
    threeLineIconWithTextHeight: 88,
    threeLineAvatarWithTextHeight: 88,
    threeLineAvatarWithTextAndIconHeight: 88
  },
  toolbar: {
    minHeight: 56
  }
}

export default Theme;