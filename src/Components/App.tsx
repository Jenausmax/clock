import '../App.css'
import InputTimer from './InputTimer/InputTimer'
import Timer from './Timer/Timer'

function App() {

  return (
    <>
    <div className='city'>МСК</div>
    <Timer addhours={0} styleName='button-color'></Timer>
    <div>-------------------------</div>
    <Timer addhours={1} styleName='button-color'></Timer>
    <div className='cityBotton'>ИЖЕВСК</div>
    <br></br>
    <div>-------------------------</div>
    <div className='cityBotton'>ТАЙМЕР</div>
    <InputTimer startTime={0}></InputTimer>
    </>
  )
}

export default App
