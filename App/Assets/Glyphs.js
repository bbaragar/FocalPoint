import React, { Component } from 'react';
import {

} from "react-native";
import {Colors} from "./styleConfig";
import {Path, Svg} from "react-native-svg";



export default class Alarm extends React.Component {
    render() {
        return (
            <Svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <Path
                    d="M23.99 8 C14.04 8 6 16.06 6 26 s8.04 18 17.99 18 S42 35.94 42 26 33.94 8 23.99 8z M24 40 c-7.73 0 -14 -6.27 -14 -14 s6.27 -14 14 -14 14 6.27 14 14 -6.26 14 -14 14z"
                    fill={Colors.iconSecondary}/>
                <Path
                    d="M44 11.44 l -9.19 -7.71 -2.57 3.06 9.19 7.71 L44 11.44z M15.76 6.78 l -2.57 -3.06 L4 11.43l2.57 3.06 9.19 -7.71z"
                    fill={Colors.iconPrimary}/>
                <Path d="M25 16 h-3 v12 l9.49 5.71 L33 31.24 l-8 -4.74 V16z" fill={Colors.iconPrimary}/>
            </Svg>
        );
    }
}

