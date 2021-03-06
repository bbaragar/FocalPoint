import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    Animated,
    View,
    ViewPropTypes as RNViewPropTypes
} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

console.disableYellowBox = true;


/*
react-native-timer-countdown
by avid21
 */
export class TimerCountdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsRemaining: this.props.initialSecondsRemaining,
            timeoutId: null,
            previousSeconds: null
        };

        this.mounted = false;

        this.tick = this.tick.bind(this);
        this.getFormattedTime = this.getFormattedTime.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.tick();

    }

    componentWillReceiveProps(newProps) {
        if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
        this.setState({ previousSeconds: null, secondsRemaining: newProps.initialSecondsRemaining });
    }

    componentDidUpdate(nextProps, nextState) {

        if ((!this.state.previousSeconds) && this.state.secondsRemaining > 0 && this.mounted) {
            //console.log('timer update');
            this.tick();
        }

    }

    componentWillUnmount() {
        this.mounted = false;
        clearTimeout(this.state.timeoutId);
    }

    tick() {
        const currentSeconds = Date.now();
        const dt = this.state.previousSeconds ? (currentSeconds - this.state.previousSeconds) : 0;
        const interval = this.props.interval;

        // correct for small variations in actual timeout time
        const intervalSecondsRemaing = (interval - (dt % interval));
        let timeout = intervalSecondsRemaing;

        if (intervalSecondsRemaing < (interval / 2.0)) {
            timeout += interval;
        }

        const secondsRemaining = Math.max(this.state.secondsRemaining - dt, 0);
        const isComplete = (this.state.previousSeconds && secondsRemaining <= 0);

        if (this.mounted) {
            if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }

            this.setState({
                timeoutId: isComplete ? null : setTimeout(this.tick, timeout),
                previousSeconds: currentSeconds,
                secondsRemaining: secondsRemaining

            });
        }

        if (isComplete) {
            if (this.props.onTimeElapsed) { this.props.onTimeElapsed(); }
            return;
        }
        if (this.props.onTick) {
            if(this) {
                this.props.onTick(currentSeconds);
            }

        }
    }

    getFormattedTime(milliseconds) {
        if (this.props.formatSecondsRemaining) {
            return this.props.formatSecondsRemaining(milliseconds);
        }

        const totalSeconds = Math.round(milliseconds / 1000);

        let seconds = parseInt(totalSeconds % 60, 10);
        let minutes = parseInt(totalSeconds / 60, 10) % 60;
        let hours = parseInt(totalSeconds / 3600, 10);

        seconds = seconds < 10 ? ':0' + seconds : ':'+ seconds; ;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours +':' : hours + ':';

        if(this.props.hideSeconds){
            seconds =  '';
        }else {
            hours = hours === '00' ? '' : hours + ':';
        }

        return hours + minutes + seconds;
    }

    render() {
        const secondsRemaining = this.state.secondsRemaining;
        return (
            <Text
                allowFontScaling={this.props.allowFontScaling}
                style={this.props.style}
            >
                {this.getFormattedTime(secondsRemaining)}
            </Text>
        );
    }
}

TimerCountdown.defaultProps = {
    interval: 1000,
    formatSecondsRemaining: null,
    onTick: null,
    onTimeElapsed: null,
    allowFontScaling: false,
    style: {},
    hideSeconds: false,
};

TimerCountdown.propTypes = {
    initialSecondsRemaining: PropTypes.number.isRequired,
    interval: PropTypes.number,
    formatSecondsRemaining: PropTypes.func,
    onTick: PropTypes.func,
    onTimeElapsed: PropTypes.func,
    allowFontScaling: PropTypes.bool,
    hideSeconds: PropTypes.bool,
    style: Text.propTypes.style,
};