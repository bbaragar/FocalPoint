import React from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Platform,
    ViewPropTypes,
    TouchableHighlight, Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {Colors} from "../Assets/styleConfig";
import NavigationService from "../NavigationService";

var sWidth = Dimensions.get('window').width;

export class NavButton extends React.Component{
   /* constructor(props){
        super(props);
        this.OnPress = this.OnPress.bind(this);
    }*/
    static props = {
        OnPress: PropTypes.func.isRequired,
        IconName: PropTypes.string,
        Big: PropTypes.bool,
        Selected: PropTypes.bool,
    }

    //TODO greyed out when button links to current screen
    //TODO change to category selection bar
    render() {
        const  {IconName,OnPress,Selected,Big} = this.props;
        var buttonStyle;
        var size;

        {/*if(Selected){
            useStyle = styles.Button;
        }else{
            useStyle = styles.Button;
        */}

        if(Big){
            size = 32;
            buttonStyle = styles.BigButton
        }else{
            size = 22;
            buttonStyle = styles.Button
        }
        return(
            <TouchableHighlight onPress={OnPress.bind(this)}  underlayColor={Colors.buttonHighlight}  style = {buttonStyle}>
                <Icon name ={IconName} size={size} color= {Colors.iconPrimary} style = {styles.Icons}/>
            </TouchableHighlight>
        );
    }

}
//underlayColor={Colors.iconHalo}


NavButton.defaultProps={
    Big: false,
    Selected: false,
}


export class NavMenu extends React.Component{

    _navPress1(){
        console.log('Pressed!');}
    _navPress2(){
        console.log('Pressed!');}
    _navPress3(){
        if (!global.cranky) {
            NavigationService.navigate('PickTime');
        }
        else {
            NavigationService.navigate('Focus');
        }
    }
    _navPress4(){
        NavigationService.navigate('Tasks');}
    _navPress5(){
        console.log('Pressed!');}


    render() {
        return (
            <View style = {styles.navBar}>
                <NavButton OnPress={this._navPress1} IconName= 'alarm'/>
                <NavButton OnPress={this._navPress2} IconName= 'calendar-text'/>
                <NavButton OnPress={this._navPress3} IconName= 'screwdriver' Big={false}/>
                <NavButton OnPress={this._navPress4} IconName= 'format-list-bulleted'/>
                <NavButton OnPress={this._navPress5} IconName= 'settings'/>
            </View>
        );
    }
}






const styles = StyleSheet.create({
    Button: {
        flex: 0,
        //width: 70,
        height: 50,
        width:50,
       // borderColor: 'black',
        //borderWidth:1,
        //borderBottomLeftRadius:40,
        //borderBottomRightRadius:40,
        borderRadius:20,
        alignItems: 'center',
        //paddingTop:10,
        justifyContent: 'center',

    },
    BigButton: {
        flex: 1,
        //width: 70,
        height: 70,
        //borderColor: 'black',
        //borderWidth:1,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        //borderRadius:40,
        alignItems: 'center',
        //justifyContent: 'center',
    },

    Icons: {

    },
    iconBorder:{
        aspectRatio:1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.iconSecondary,
        borderWidth:3,
        borderRadius: 14,
        width: 45,
    },
    navBar:{
        alignItems: 'center',
        justifyContent: 'space-around',
        width: sWidth,
        height:75,
        flexDirection:'row',
        //borderColor: 'black',
        //borderWidth:1,
    },

});

/*
        ...Platform.select({
            ios:{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            },
            android:{
                elevation: 4,
            },
        }),
 */