import React, { Component } from "react";

export interface InputTimerProps{
    startTime: number
}

export interface InputTimerState{
    timeMinute: number
    timeSecond: number
    time: string
    styleForm: string
    styleInput: string
}

class InputTimer extends React.Component<InputTimerProps, InputTimerState> {
    constructor(props: InputTimerProps) {
        super(props);
        this.state = {
            timeMinute: 0,
            timeSecond: 0,
            time: "",
            styleForm: "",
            styleInput: "none"
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getTime = this.getTime.bind(this);
    }

    private handleSubmit(e: any) {
        e.preventDefault();
        this.setState({styleForm: "none"});
        this.setState({styleInput: ""});
      }

    private onChange(e: any) {
    this.setState({
        timeMinute: e.target.value > 0 ? (e.target.value * 60) : 0,
        timeSecond: e.target.value > 0 ? (e.target.value * 60) : 0
    });
    }

    componentDidMount(): void {
    setInterval(
        ()=> this.tick(),
        1000
        );
    }

    private tick(): void {
        this.setState({
            time: this.getTime()
        });
      }

    private getTime(): string {

        // if(this.state.timeSecond === 0){
        //     return;
        // }

        this.setState({
            timeMinute: this.state.timeMinute - 1,
            timeSecond: this.state.timeSecond - 1
        });

        const minute = Math.floor(this.state.timeMinute/60%60);
        const second = Math.floor(this.state.timeSecond%60);

        if(minute < 0){
            this.setState({
                timeMinute: 0,
            });

            return `00:${second}`;
        }

        if(second < 0){
            this.setState({
                timeSecond: 0
            });

            return `00:00`;
        }

        if(minute < 10){
            return `0${minute}:${second}`;
        }

        if(second < 10){
            return `${minute}:0${second}`;
        }

    return `${minute}:${second}`;
    }

    private soundPlay(): void {
        const audio = new Audio();
        audio.src = '/src/wwwroot/audio/time.mp3';
        audio.play();
      }

    render() {
        return (
            <>
            <form onSubmit={this.handleSubmit} style={{display:this.state.styleForm}}>
                <p>
                    <input type="text" onChange={this.onChange}/>
                </p>
                <input type="submit" value="Начать отсчет" />
            </form>
            <br></br>
            <h1 style={{display:this.state.styleInput}}>{this.state.time}</h1>
            </>
        );
    }
}

export default InputTimer;