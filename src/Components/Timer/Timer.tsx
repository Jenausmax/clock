import React, { Component } from "react";

export interface TimerProps {
    addhours: number
    styleName: string
}

export interface TimerState {
    timerId?: []
    timer: Date
}

class Timer extends Component<TimerProps, TimerState> {
    constructor(props: TimerProps) {
        super(props);
        this.state = { timer: new Date() }
    }

    componentDidMount(): void {
        setInterval(
            ()=> this.tick(),
            1000
          );
    }

    private tick(): void {
        this.setState({
          timer: this.addHours(new Date, this.props.addhours)
        });
      }

    private addHours(date: Date, hours: number): Date {
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        return date;
      }

    render() {
        return <h1  className={this.props.styleName}>{this.state.timer.toLocaleTimeString()}</h1>;
        }
}

export default Timer;