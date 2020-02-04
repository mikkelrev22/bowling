import React, { useState }  from 'react'

const Frame = ({bowl1, bowl2, currentScore, frameNumber}) => {
return <div className="frame">
  Frame: {frameNumber+1}
<div className="bowl"> Bowl1 Score: {bowl1}</div>
<div className="bowl"> Bowl2 Score: {bowl2}</div>
<div className="score">Frame Score: {currentScore}</div>
</div>
}

const App = () => {
  const [scoreboard, setScore] = useState([[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]])
  const [currentFrame, setCurrentFrame]  = useState(0)
  const calculateScore = (scoreboard) => {
    //create a function that calculates the current running score
    let score = 0
    for (let frame of scoreboard) {
        score += frame[0] + frame[1]
    }
    return score
  }
  const endGame = () => {
  
  }

  const bowl = () => {
      if (currentFrame === 11) endGame()
      if (scoreboard[currentFrame][0] !== null) {
        let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
        newScoreboard[currentFrame][1] = bowl2Score
        setScore(newScoreboard)
        setCurrentFrame(currentFrame + 1)
      }
      else if (scoreboard[currentFrame][0] === null) {
        let bowl1Score = Math.floor(Math.random()*11)
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
        newScoreboard[currentFrame][0] = bowl1Score
        setScore(newScoreboard)
      }
  }
  return (
  <div className="app">
    <div className="scoreboard">
      {scoreboard.map((frame, i) => (
      <Frame key={i} bowl1={frame[0]} bowl2={frame[1]} currentScore={calculateScore(scoreboard)} frameNumber={i}/>
      ))}
    </div>
    <button className="bowlButton" onClick={bowl}>Click to bowl!</button>
  </div>
  )
}

export default App