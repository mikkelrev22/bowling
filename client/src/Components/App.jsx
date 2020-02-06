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

  const calculateScore = (newScoreboard) => {
    let score = 0
    if (currentFrame) {
      let i = currentFrame
        //add logic for calculating 2 strikes in prev. frames (debug)
        // if (newScoreboard[i-2][0] === 'X' && newScoreboard[i-1][0] === 'X') {
        //     newScoreboard[i-2][2] = newScoreboard[i-2][2] + newScoreboard[i-1][2] + newScoreboard[i][2]
        // }
        //add logic for calculating 1 strike in prev. frames
        
        // if (newScoreboard[i-1][0] === 'X' && newScoreboard[i][1] === 'X') {

        // }
        if (newScoreboard[i-1][0] === 'X' && newScoreboard[i][1] === '/') {
          newScoreboard[i-1][2] = newScoreboard[i-1][2] + 10 - newScoreboard[i][0]
        }
        else {
          if (newScoreboard[i][1] === null) newScoreboard[i-1][2] = newScoreboard[i-1][2] + newScoreboard[i][0]
          if (newScoreboard[i][1] !== null) newScoreboard[i-1][2] = newScoreboard[i-1][2] + newScoreboard[i][1]
        }
        //add logic for calculating spares in prev. frames
        if (newScoreboard[i-1][1] === '/' && newScoreboard[i][1] === null) {
          if (newScoreboard[i][0] === 'X') {
            newScoreboard[i-1][2] = newScoreboard[i-1][2] + 10
          }
          else {
            newScoreboard[i-1][2] = newScoreboard[i-1][2] + newScoreboard[i][0]
          }
        }
        
        //add logic for calculating spares and strikes in current frame
        if (newScoreboard[i][0] === 'X' || newScoreboard[i][1] === '/') {
          score = newScoreboard[i-1][2] + 10
        } 
        else {
          score = newScoreboard[i-1][2] + newScoreboard[i][0] + newScoreboard[i][1]
        }
    }
    else if (newScoreboard[0][0] === 'X' || newScoreboard[0][1] === '/') {
      score = 10
    }
    else {
      score = newScoreboard[0][0] + newScoreboard[0][1]
    }
    newScoreboard[currentFrame][2] = score
    return newScoreboard
  }
 
  const bowl = () => {
      if (scoreboard[currentFrame][0] !== null) {
        let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
        if (bowl2Score + scoreboard[currentFrame][0] === 10) bowl2Score = '/'
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
        if (bowl1Score === 10) {
          newScoreboard[currentFrame][0] = 'X'
          newScoreboard[currentFrame][1] = null
          calculateScore(newScoreboard)
          setScore(newScoreboard)
          setCurrentFrame(currentFrame + 1)
        }
        else {
          calculateScore(newScoreboard)
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