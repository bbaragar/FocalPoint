import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Platform,
  ViewPropTypes,
  TouchableHighlight, ScrollView, Touchable
} from 'react-native'
import {Colors} from '../Assets/styleConfig'
import {Task} from '../dataStructs/Task'
import {vMemory} from '../App'
import PropTypes from 'prop-types';
import {WheelPicker} from 'react-native-wheel-picker-android';
import FadeInView from './FadeInView'

var sWidth = Dimensions.get('window').width
var sLength = Dimensions.get('window').height


export class FocusSetModal extends React.Component {

}