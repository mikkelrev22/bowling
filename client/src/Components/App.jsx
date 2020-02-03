import React, { useState }  from 'react'

const Frame = ({bowl1, bowl2, currentScore, frameNumber}) => {
return <div className="frame">
  Frame: {frameNumber+1}
  {bowl1 &&
<div className="bowl"> Bowl1 Score: {bowl1}</div>
  } 
  {bowl2 &&
<div className="bowl"> Bowl2 Score: {bowl2}</div>
  } {bowl2 &&
<div className="score">Frame Score: {currentScore}</div>
}
</div>
}

const App = () => {
  const [scoreboard, setScore] = useState([])
  // const [currentFrame, setCurrentFrame] = useState([]) I don't think this is necessary either
  // const [bowl, setBowl] = useState(0) I think this may be unneccesary
  const Bowl = () => {
      let currentFrame = scoreboard.length-1 
      if (currentFrame < 0) {
        let bowl1Score = [Math.floor(Math.random()*11)]
        setScore([...scoreboard, bowl1Score])
      }
      else if (scoreboard[currentFrame].length === 1) {
        let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
        let scoreboardCopy = [...scoreboard]
        scoreboardCopy[currentFrame].push(bowl2Score)
        setScore(scoreboardCopy)
      }
      else if (scoreboard[currentFrame].length === 2) {
        let bowl1Score = [Math.floor(Math.random()*11)]
        setScore([...scoreboard, bowl1Score])
      }
  }
  return (
  <div className="app">
    <div className="scoreboard">
      {scoreboard.map((frame, i) => (
      <Frame 
      key={i} 
      bowl1={frame[0]} 
      bowl2={frame[1]} 
      currentScore={frame[0]+frame[1]} 
      frameNumber={i}
      />
      ))}
    </div>
    <button className="bowlButton" onClick={Bowl}>Click to bowl!</button>
  </div>
  )
}

export default App