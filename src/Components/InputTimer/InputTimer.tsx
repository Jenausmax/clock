import React from "react";
import file_sound_patch from "../../wwwroot/audio/time.mp3";

export interface InputTimerProps{
    startTime: number
}

export interface InputTimerState{
    timeHour: number
    timeMinute: number
    timeSecond: number
    time: string | null
    styleForm: string
    styleInput: string
    flagSound: boolean | null
}

class InputTimer extends React.Component<InputTimerProps, InputTimerState> {
    private audio = new Audio(file_sound_patch);
    private btnStyle = "none";
    private isStopAudio = false;
    private btnStopTimer = "none";
    private timeMin: any;
    constructor(props: InputTimerProps) {
        super(props);
        this.state = {
            timeMinute: 0,
            timeSecond: 0,
            timeHour: 0,
            time: ' ',
            styleForm: "",
            styleInput: "none",
            flagSound: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTime = this.getTime.bind(this);
        this.onClick = this.onClick.bind(this);

        this.timeMin = React.createRef();
    }

    /**
     * Обработчик формы.
     */
    private handleSubmit(e: any) {
        e.preventDefault();
        this.setState({styleForm: "none"});
        this.setState({styleInput: ""});
        this.btnStopTimer = "";
        this.btnStyle = "none";
        this.isStopAudio = true;

        this.setState({
            timeMinute: this.timeMin.current.value > 0 ? (this.timeMin.current.value * 60) : 0,
            timeSecond: this.timeMin.current.value > 0 ? (this.timeMin.current.value * 60) : 0,
            timeHour: this.timeMin.current.value > 0 ? (this.timeMin.current.value * 60) : 0,
            flagSound: true
        });
      }

    componentDidMount(): void {
        setInterval(
            ()=> this.tick(),
            1000
            );
    }

    /**
     * Метод отсчета времени.
     */
    private tick(): void {
        if(this.isStopAudio){
            this.setState({
                time: this.getTimeOnOffSoundHandler()
            });

            if(this.state.time == null || this.props.startTime != 0){
                this.audio.play();
                this.isStopAudio = false;
                this.btnStyle = "";
                this.btnStopTimer = "none";
                this.setState({time: '00:00:00'});
            }
        }
    }

    /**
     * Обработчик включения звука.
     */
    private getTimeOnOffSoundHandler(): string | null {
        if(this.state.flagSound  === true){
            return this.getTime();
        }
        else if (this.state.flagSound  === false) {
            this.setState({styleInput: ""});
            return null;
        }

        return ' ';
    }

    /**
     * Метод отсчета времени.
     */
    private getTime(): string {
        this.setState({
            timeHour: this.state.timeHour - 1,
            timeMinute: this.state.timeMinute - 1,
            timeSecond: this.state.timeSecond - 1
        });

        const hour = Math.floor((this.state.timeMinute / 60 / 60)%60);
        const minute = Math.floor((this.state.timeMinute / 60)%60);
        const second = Math.floor((this.state.timeSecond)%60);

        const hou = hour < 10 ? '0' + hour.toString() : hour.toString()
        const min = minute < 10 ? '0' + minute.toString() : minute.toString();
        const sec = second < 10 ? '0' + second.toString() : second.toString();

        if(second < 0){
            if(this.state.flagSound){
                this.setState({
                    timeSecond: 0
                });

                this.setState({
                    flagSound: false
                });

                return `00:00:00`;
            }
        }

        if(minute < 0){
            this.setState({
                timeMinute: 0,
            });

            return `00:00:${sec}`;
        }

        if(hour <0){
            this.setState({
                timeHour: 0,
            });

            return `00:${min}:${sec}`;
        }

        return `${hou}:${min}:${sec}`;
    }

    /**
     * Обработчик нажатия стоп кнопки.
     */
    private onClick() {
        this.audio.pause();
        this.setState({styleInput: "none", styleForm: "", timeMinute: 0, timeSecond: 0, flagSound: null, time: '00:00'});
        this.isStopAudio = false;
        this.btnStyle = "none";
        this.btnStopTimer = "none";
    }

    render() {
        return (
            <>
            <form onSubmit={this.handleSubmit} id="create-course-form" style={{display: this.state.styleForm}}>
                <p>
                    <input required type="text" placeholder="Введите минуты." title="Введите минуты" ref={this.timeMin} max={60}/>
                </p>
                <input className="btnInput" type="submit" value="Начать отсчет" />
            </form>
            <br></br>
            <h1 style={{display: this.state.styleInput}}>{this.state.time}</h1>
            <button type="button" className="btn" style={{display: this.btnStyle}} onClick={this.onClick}>Стоп</button>
            <button type="button" className="btn" style={{display: this.btnStopTimer}} onClick={this.onClick}>Стоп таймер</button>
            </>
        );
    }
}

export default InputTimer;