import React, { useState }  from 'react'

const Frame = ({bowl1, bowl2, currentScore, frameNumber}) => {
return <div className="frame">
  Frame: {frameNumber+1}
<div className="bowl"> Bowl1 Score: {bowl1}</div>
<div className="bowl"> Bowl2 Score: {bowl2}</div>
<div className="score">Current Score: {currentScore}</div>
</div>
}

const App = () => {
  const [scoreboard, setScore] = useState([[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]])
  const [currentFrame, setCurrentFrame]  = useState(0)
  // const [totalScore, setTotalScore] = useState()

  const calculateScore = (newScoreboard) => {
    let score = 0
    if (currentFrame) {
      let i = 1;
      while (i <= currentFrame) {
        score = newScoreboard[i-1][2] + newScoreboard[i][0] + newScoreboard[i][1] 
        i++
      }
    }
    else {
      score = newScoreboard[0][0] + newScoreboard[0][1]
    }
    // console.log(newScoreboard[currentFrame][0], newScoreboard[currentFrame][1], score)
    newScoreboard[currentFrame][2] = score
    return newScoreboard
  }
  // const endGame = () => {
  //   if (currentFrame === 11) {
      
  //   }
  // }

  const bowl = () => {
      if (currentFrame === 11) endGame()
      if (scoreboard[currentFrame][0] !== null) {
        let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
        newScoreboard[currentFrame][1] = bowl2Score
        newScoreboard[currentFrame][2] += newScoreboard[currentFrame][1]
        setScore(newScoreboard)
        calculateScore(newScoreboard)
        setCurrentFrame(currentFrame + 1)
      }
      else if (scoreboard[currentFrame][0] === null) {
        let bowl1Score = Math.floor(Math.random()*11)
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
        newScoreboard[currentFrame][0] = bowl1Score
        calculateScore(newScoreboard)
        setScore(newScoreboard)
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