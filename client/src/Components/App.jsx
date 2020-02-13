import React, { useState }  from 'react'

const Frame = ({bowl1, bowl2, currentScore, frameNumber}) => {
return <div className="frameContianer">
  {frameNumber+1}
  <div className="frame">
<div className="bowl1"> {bowl1}</div>
<div className="bowl2"> {bowl2}</div>
<div className="score"> {currentScore}</div>
</div>
</div>
}

const Frame10 = ({bowl1, bowl2, bowl3, currentScore, frameNumber}) => {
  return <div className="frameContianer">
  {frameNumber}
  <div className="frame">
<div className="bowl1"> {bowl1}</div>
<div className="bowl2"> {bowl2}</div>
<div className= "bowl3"> {bowl3}</div>
<div className="score"> {currentScore}</div>
</div>
</div>
}

const App = () => {
  const [scoreboard, setScore] = useState([[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]])
  const [currentFrame, setCurrentFrame]  = useState(0)
  const [scoreboardToRender, setScoreboardToRender] = useState([[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null, null]])

  const renderScoreboard = (newScoreboard) => {
    let scoreboardToCheck = JSON.parse(JSON.stringify(newScoreboard))
    let i = 0
    while (i <= currentFrame) {
      if (scoreboardToCheck[i][0] === 10) {
        scoreboardToCheck[i][1] = 'X'
        scoreboardToCheck[i][0] = null
      }
      if (scoreboardToCheck[i][0] === 0) scoreboardToCheck[i][0] = '-'
      if (scoreboardToCheck[i][1] === 0) scoreboardToCheck[i][1] = '-'
      if (scoreboardToCheck[i][0] + scoreboardToCheck[i][1] === 10) scoreboardToCheck[i][1] = '/'
      i++
    }
      setScoreboardToRender(scoreboardToCheck)
  }

  const calculateScoreBowl1 = (newScoreboard, bowl1Score) => {
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
      // in case of single strike (can still refactor w/ double strike case)
    if (newScoreboard[prevPrev]) {
      if (newScoreboard[previous][0] === 10 && newScoreboard[prevPrev][0] !== 10) {
          newScoreboard[previous][2] += newScoreboard[currentFrame][0]
        }
        // in case of double strike
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
        newScoreboard[currentFrame][2] = newScoreboard[previous][2] + newScoreboard[currentFrame][0] + newScoreboard[currentFrame][1]
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

  const bowl3_Frame10 = () => {
    let bowl3Score = Math.floor(Math.random()*(11))
    let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
    newScoreboard[currentFrame][3] = bowl3Score
    newScoreboard[currentFrame][2] += newScoreboard[currentFrame][3]
    setScore(newScoreboard)
    renderScoreboard(newScoreboard)
  }

  const bowl2_Frame10 = () => {
    //check for a strike on previous bowl
    if (scoreboard[currentFrame][0] === 10) {
      let bowl2Score = Math.floor(Math.random()*(11))
      let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
      newScoreboard[currentFrame][1] = bowl2Score
      newScoreboard[currentFrame][2] += newScoreboard[currentFrame][1]
      checkForStrikesBowl2(newScoreboard)
      setScore(newScoreboard)
      renderScoreboard(newScoreboard)
    }
    else {
      //use remaining pins
      let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
      let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
      newScoreboard[currentFrame][1] = bowl2Score
      newScoreboard[currentFrame][2] += newScoreboard[currentFrame][1]
      checkForStrikesBowl2(newScoreboard)
      setScore(newScoreboard)
      renderScoreboard(newScoreboard)
    }
  }

  const bowl = () => {
      //handle frame 10 bowl 3
      if (currentFrame === 9 && scoreboard[currentFrame][1] !== null) {
        if (scoreboard[currentFrame][0] === 10 || scoreboard[currentFrame][0] + scoreboard[currentFrame][1] === 10) {
          bowl3_Frame10()
        }
        else {
          console.log('endGame')
        }
      }
      //second bowl
      else if (scoreboard[currentFrame][0] !== null) {
        //handle frame 10, bowl 2
        if (currentFrame === 9) {
          bowl2_Frame10()
        }
        else {
        let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
        let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
          newScoreboard[currentFrame][1] = bowl2Score
          newScoreboard[currentFrame][2] += newScoreboard[currentFrame][1]
          checkForStrikesBowl2(newScoreboard)
          setScore(newScoreboard)
          renderScoreboard(newScoreboard)
          setCurrentFrame(currentFrame + 1)
        }
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
          calculateScoreBowl1(newScoreboard, bowl1Score)
          setScore(newScoreboard)
          renderScoreboard(newScoreboard)
          if (currentFrame !== 9) {
            setCurrentFrame(currentFrame + 1)
          }
        }
          //in all other cases
        else {
          calculateScoreBowl1(newScoreboard, bowl1Score)
          setScore(newScoreboard)
          renderScoreboard(newScoreboard)
        }
      }
      
  }

  return (
  <div className="app">
    <div className="scoreboard">
      {scoreboardToRender.map((frame, i) => (
      <Frame key={i} bowl1={frame[0]} bowl2={frame[1]} currentScore={frame[2]} frameNumber={i} bowl3={frame[3]}/>
      ))}
      <Frame10 bowl1={scoreboardToRender[9][0]} bowl2={scoreboardToRender[9][1]} currentScore={scoreboardToRender[9][2]} frameNumber={10} bowl3={scoreboardToRender[9][3]}/>
    </div>
    <div className="bowlButtonContainer">
    <button className="bowlButton" onClick={bowl}>Click to bowl!</button>
    </div>
  </div>
  )
}

export default App