import React, { useState }  from 'react'

const Frame = ({bowl1, bowl2, currentScore, frameNumber}) => {
return <div className="frame">
  {frameNumber+1}
<div className="bowl">{bowl1} {bowl2}</div>
<div className="score">{currentScore}</div>
</div>
}

const App = () => {
  const [scoreboard, setScore] = useState([[]])
  // const [currentFrame, setCurrentFrame] = useState([]) I don't think this is necessary either
  // const [bowl, setBowl] = useState(0) I think this may be unneccesary
  const Bowl = () => {
      setScore([...scoreboard, scoreboard[0][Math.floor(Math.random()*11)]])
  }
  return (
  <div className="app">
    <div className="scoreboard">
      {scoreboard.map((frame, i) => (
      <Frame key={i} bowl1={frame[0]} bowl2={frame[1]} currentScore={frame[0]+frame[1]} frameNumber={i}/>
      ))}
    </div>
    <button className="bowlButton" onClick={Bowl}>Click to bowl!</button>
  </div>
  )
}

export default App