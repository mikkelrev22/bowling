import React, { useState }  from 'react'

const Frame = ({bowl1, bowl2, currentScore, frameNumber}) => {
return <div className="frame">
  Frame: {frameNumber+1}
<div className="bowl"> Bowl 1 Score: {bowl1}</div>
<div className="bowl"> Bowl 2 Score: {bowl2}</div>
<div className="score">Current Score: {currentScore}</div>
</div>
}

const App = () => {
  const [scoreboard, setScore] = useState([[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]])
  const [currentFrame, setCurrentFrame]  = useState(0)

  const calculateScoreBowl1 = (newScoreboard) => {
    
  }
  const calculateScoreBowl2 = (newScoreboard) => {

  }
  
  const calculateScoreStrike = (newScoreboard) => {

  }

  const checkForStrikes = (newScoreboard) => {

  }

  const checkForSpares = (newScoreboard) => {

  }

  const bowl = () => {
      if (scoreboard[currentFrame][0] !== null) {
        let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
          newScoreboard[currentFrame][1] = bowl2Score
          newScoreboard[currentFrame][2] += newScoreboard[currentFrame][1]
          setScore(newScoreboard)
          calculateScoreBowl2(newScoreboard)
          setCurrentFrame(currentFrame + 1)
      }
      else if (scoreboard[currentFrame][0] === null) {
        let bowl1Score = Math.floor(Math.random()*11)
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
        newScoreboard[currentFrame][0] = bowl1Score
        if (bowl1Score === 10) {
          newScoreboard[currentFrame][0] = 10
          newScoreboard[currentFrame][1] = null
          calculateScoreStrike(newScoreboard)
          setScore(newScoreboard)
          setCurrentFrame(currentFrame + 1)
        }
        else {
          calculateScoreBowl1(newScoreboard)
          setScore(newScoreboard)
        }
      }
  }

  return (
  <div className="app">
    <div className="scoreboard">
      {scoreboard.map((frame, i) => (
      <Frame key={i} bowl1={frame[0]} bowl2={frame[1]} currentScore={frame[2]} frameNumber={i}/>
      ))}
    </div>
    <button className="bowlButton" onClick={bowl}>Click to bowl!</button>
  </div>
  )
}

export default App