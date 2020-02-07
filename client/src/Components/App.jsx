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

  const calculateScoreBowl1 = (newScoreboard, bowl1Score) => {
    //if this is not the first frame
    if (currentFrame) { 
      //check for strikes and spares to update previous scores
      checkForStrikes(newScoreboard)
      checkForSpares(newScoreboard)
      //add first bowl of new frame to existing score
      newScoreboard[currentFrame][2] = newScoreboard[currentFrame - 1][2] + bowl1Score
    }
    //if this is the first frame
    else {
    //make the first bowl the total score
      newScoreboard[currentFrame][2] = bowl1Score
    }
  }

  const calculateScoreBowl2 = (newScoreboard, bowl2Score) => {
    //add second bowl to the total score; no need to check for strikes or spares again
    newScoreboard[currentFrame][2] = newScoreboard[currentFrame][2] + bowl2Score
  }

  const checkForStrikes = (newScoreboard) => {

  }

  const checkForSpares = (newScoreboard) => {

  }

  const bowl = () => {
      //second bowl
      if (scoreboard[currentFrame][0] !== null) {
        let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
          newScoreboard[currentFrame][1] = bowl2Score
          newScoreboard[currentFrame][2] += newScoreboard[currentFrame][1]
          setScore(newScoreboard)
          calculateScoreBowl2(newScoreboard)
          setCurrentFrame(currentFrame + 1)
      }
      //first bowl
      else if (scoreboard[currentFrame][0] === null) {
        let bowl1Score = Math.floor(Math.random()*11)
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
        newScoreboard[currentFrame][0] = bowl1Score
        //in case of a strike
        if (bowl1Score === 10) {
          newScoreboard[currentFrame][0] = 10
          newScoreboard[currentFrame][1] = null
          calculateScoreBowl1(newScoreboard)
          setScore(newScoreboard)
          setCurrentFrame(currentFrame + 1)
        }
        //in all other cases
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