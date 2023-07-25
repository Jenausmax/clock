import '../App.css'
import Timer from './Timer/Timer'

function App() {

  return (
    <>
    <div className='city'>МСК</div>
    <Timer addhours={0} styleName='button-color'></Timer>
    <div>-------------------------</div>
    <Timer addhours={1} styleName='button-color'></Timer>
    <div className='cityBotton'>ИЖЕВСК</div>
    </>
  )
}

export default App
