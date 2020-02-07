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
      checkForStrikesBowl1(newScoreboard)
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

  const checkForStrikesBowl1 = (newScoreboard) => {
    //check previous two frames for strikes during first bowl of new frame
    let previous = currentFrame - 1
    let prevPrev = currentFrame - 2

    //in case of a strike on the first frame
    if (currentFrame === 1 && newScoreboard[previous][0] === 10) {
      newScoreboard[previous][2] += newScoreboard[currentFrame][0]
    }
    // in case of single strike (refactor with double strike...double strike can be added as a conditional to single strike)
    if (newScoreboard[prevPrev]) {
      if (newScoreboard[previous][0] === 10 && newScoreboard[prevPrev][0] !== 10) {
        newScoreboard[previous][2] += newScoreboard[currentFrame][0]
      }
    }
    // in case of double strike
    if (newScoreboard[prevPrev]) {
      if (newScoreboard[previous][0] === 10 && newScoreboard[prevPrev][0] === 10) {
        newScoreboard[prevPrev][2] += newScoreboard[currentFrame][0]
        newScoreboard[previous][2] = newScoreboard[prevPrev][2] + newScoreboard[previous][0] + newScoreboard[currentFrame][0]
      }
    }
  }

  const checkForStrikesBowl2 = (newScoreboard) => {
    //check for strikes in the previous frame 
    let previous = currentFrame - 1
    if (newScoreboard[previous]) {
      if (newScoreboard[previous][0] === 10) {
        newScoreboard[previous][2] += newScoreboard[currentFrame][1]
      }
    }
  }

  const checkForSpares = (newScoreboard) => {
    //check previous frame for spares
    let previous = currentFrame - 1
    if (newScoreboard[previous][0] + newScoreboard[previous][1] === 10 && newScoreboard[previous][0] !== 10) {
      newScoreboard[previous][2] = newScoreboard[previous][2] + newScoreboard[currentFrame][0]
    }
  }

  const bowl = () => {
      //second bowl
      if (scoreboard[currentFrame][0] !== null) {
        let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
          newScoreboard[currentFrame][1] = bowl2Score
          newScoreboard[currentFrame][2] += newScoreboard[currentFrame][1]
          checkForStrikesBowl2(newScoreboard)
          setScore(newScoreboard)
          setCurrentFrame(currentFrame + 1)
      }
      //first bowl
      else if (scoreboard[currentFrame][0] === null) {
        let bowl1Score = 10
        // Math.floor(Math.random()*11)
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
        newScoreboard[currentFrame][0] = bowl1Score
        //in case of a strike
        if (bowl1Score === 10) {
          newScoreboard[currentFrame][0] = 10
          newScoreboard[currentFrame][1] = null
          calculateScoreBowl1(newScoreboard, bowl1Score)
          setScore(newScoreboard)
          setCurrentFrame(currentFrame + 1)
        }
        //in all other cases
        else {
          calculateScoreBowl1(newScoreboard, bowl1Score)
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