import React, { Component } from "react";

export interface InputTimerProps{
    startTime: number
}

export interface InputTimerState{
    timeMinute: number
    styleForm: string
    styleInput: string
}

class InputTimer extends React.Component<InputTimerProps, InputTimerState> {
    constructor(props: InputTimerProps) {
        super(props);
        this.state = { timeMinute: 0, styleForm: "", styleInput: "none" }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    private handleSubmit(e: any) {
        e.preventDefault();
        this.setState({styleForm: "none"});
        this.setState({styleInput: ""});
      }

      private onChange(e: any) {
        this.setState({timeMinute: e.target.value});
      }

    render() {
        return (
            <>
            <form onSubmit={this.handleSubmit} style={{display:this.state.styleForm}}>
                <p>
                    <input type="text" onChange={this.onChange}/>
                </p>
                <input type="submit" value="Отправить" />
            </form>
            <br></br>
            <label style={{display:this.state.styleInput}}>{this.state.timeMinute} минут</label>
            </>
        );
      }
}

export default InputTimer;