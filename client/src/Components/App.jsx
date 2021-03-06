import React, { useState, useEffect }  from 'react'

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
  <div className="frame10">
<div className="bowl1Frame10"> {bowl1}</div>
<div className="bowl2Frame10"> {bowl2}</div>
<div className= "bowl3Frame10"> {bowl3}</div>
<div className="score"> {currentScore}</div>
</div>
</div>
}

const App = () => {
  const [scoreboard, setScore] = useState([[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]])
  const [currentFrame, setCurrentFrame]  = useState(0)
  const [scoreboardToRender, setScoreboardToRender] = useState([[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null, null]])
  const [cheer, setCheer] = useState('')

  useEffect(()=>{
    renderScoreboard(scoreboardToRender, scoreboard)
  }, [scoreboard])

  const endGame = () => {
    setCheer('Game Over!')
    setTimeout(()=>{scoreboard[9][2] > 110 ? setCheer(`Your score was ${scoreboard[9][2]}.` + '\n Good job!') : setCheer(`Your score was ${scoreboard[9][2]}.` + '\n Better luck next time!') 
    }, 3000)
    setTimeout(()=>{location.reload()}, 10000)
  }

  const displayStrikeCheer = () => {
    setCheer('Strike!')
    removeCheer()
  }

  const displaySpareCheer = () => {
    setCheer('Spare!')
    removeCheer()
  }

  const removeCheer = () => {
    setTimeout(()=>{setCheer('')}, 2500)
  }

  const renderScoreboard = (scoreboardToRender, scoreboard) => {
    //deep copy of the scoreboardToRender in state
    let scoreboardToRenderDeepCopy = JSON.parse(JSON.stringify(scoreboardToRender))
    //check & set score from previous frame in case of update
    if (scoreboardToRenderDeepCopy[currentFrame-1]) {
      scoreboardToRenderDeepCopy[currentFrame-1][2] = scoreboard[currentFrame-1][2]
    }
    //check & set score from previous previous frame in case of update
    if (scoreboardToRenderDeepCopy[currentFrame-2]) {
      scoreboardToRenderDeepCopy[currentFrame-2][2] = scoreboard[currentFrame-2][2]
    }
    //set score of current frame
    if (scoreboard[0][0] !== null) {
      scoreboardToRenderDeepCopy[currentFrame][2] = scoreboard[currentFrame][2]
    }
    //getting bowl1 & bowl2 scores from deep copy of scoreboard
    scoreboardToRenderDeepCopy[currentFrame][0] = scoreboard[currentFrame][0]
    scoreboardToRenderDeepCopy[currentFrame][1] = scoreboard[currentFrame][1]
    //get bowl3 score if it exists
    if (currentFrame === 9 && scoreboard[9][3] !== null) {
      if (scoreboard[9][3] > -1) {
      scoreboardToRenderDeepCopy[9][3] = scoreboard[9][3]
      }
    }
    //if there is a strike
    if (scoreboardToRenderDeepCopy[currentFrame][0] === 10 && currentFrame < 9) {
      //if there is a strike on any frame by the 10th
      scoreboardToRenderDeepCopy[currentFrame][1] = 'X'
      scoreboardToRenderDeepCopy[currentFrame][0] = null
    }  
    //if there is a strike on the 10th frame, first bowl
    if (scoreboardToRenderDeepCopy[currentFrame][0] === 10 && currentFrame === 9) {
      scoreboardToRenderDeepCopy[currentFrame][0] = 'X'
    }
    //spare on any frame
    if (scoreboardToRenderDeepCopy[currentFrame][0] + scoreboardToRenderDeepCopy[currentFrame][1] === 10 && scoreboardToRenderDeepCopy[currentFrame][0] !== 'X') {
      scoreboardToRenderDeepCopy[currentFrame][1] = '/'
    }
    //if there is a gutter ball on the first or second bowl of a frame
    if (scoreboardToRenderDeepCopy[currentFrame][0] === 0) scoreboardToRenderDeepCopy[currentFrame][0] = '-'
    if (scoreboardToRenderDeepCopy[currentFrame][1] === 0) scoreboardToRenderDeepCopy[currentFrame][1] = '-'
    //if there is a strike on the first bowl of the 10th frame
    if (currentFrame === 9 && scoreboardToRender[9][0] === 'X') {
      //if there is a strike on the 10th frame, first & second bowl
      if (scoreboardToRenderDeepCopy[9][1] === 10) scoreboardToRenderDeepCopy[9][1] = 'X'
      //if there is a strike and then a spare
      if (currentFrame ===9) console.log(scoreboard[9][1], scoreboard[9][3], scoreboard[9][1] + scoreboard[9][3])
      if (scoreboardToRenderDeepCopy[9][1] !== 'X' && scoreboard[9][1] + scoreboard[9][3] === 10) {
        scoreboardToRenderDeepCopy[9][3] = '/'
      }
      //if there are three strikes
      if (scoreboardToRenderDeepCopy[9][0] === 'X' && scoreboardToRenderDeepCopy[9][1] === 'X' && scoreboardToRenderDeepCopy[9][3] === 10) scoreboardToCheck[9][3] = 'X'
    }
    if (currentFrame === 9) {
      //if there is a spare and then a strike on the 10th frame
      if (scoreboardToRenderDeepCopy[9][1] === '/' && scoreboardToRenderDeepCopy[9][3] === 10) scoreboardToRenderDeepCopy[9][3] = 'X'
      //if there is a gutter ball on the 3rd bowl of the the 10th frame
      if (scoreboardToRenderDeepCopy[9][3] === 0) scoreboardToRenderDeepCopy[9][3] = '-'
    }
    //setState with new scoreboard to be mapped
    setScoreboardToRender(scoreboardToRenderDeepCopy)
    //if bowl1 strike and not 10th frame, setCurrent Frame to next
    if (scoreboard[currentFrame][0] === 10 && currentFrame !== 9) {
      setCurrentFrame(currentFrame + 1)
    }
    //if bowl2 and not 10th frame, setCurrent Frame to next
    else if (scoreboard[currentFrame][1] !== null && currentFrame !== 9) {
      setCurrentFrame(currentFrame + 1)
    }
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
    let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
    if (scoreboard[9][1] === 10) {
    let bowl3Score = Math.floor(Math.random()*(11))
    newScoreboard[currentFrame][3] = bowl3Score
    newScoreboard[currentFrame][2] += newScoreboard[currentFrame][3]
    }
    else {
      let bowl3Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][1]))
      newScoreboard[currentFrame][3] = bowl3Score
      newScoreboard[currentFrame][2] += newScoreboard[currentFrame][3]
    }
    setScore(newScoreboard)
  }

  const bowl2_Frame10 = () => {
    let newScoreboard = JSON.parse(JSON.stringify(scoreboard))
    //check for a strike on previous bowl
    if (scoreboard[9][0] === 10) {
      let bowl2Score = Math.floor(Math.random()*(11))
      newScoreboard[9][1] = bowl2Score
      newScoreboard[9][2] += newScoreboard[9][1]
    }
    else {
      //use remaining pins
      let bowl2Score = Math.floor(Math.random()*(11-scoreboard[currentFrame][0]))
      newScoreboard[9][1] = bowl2Score
      newScoreboard[9][2] += newScoreboard[9][1]
    }
    checkForStrikesBowl2(newScoreboard)
    setScore(newScoreboard)
  }

  const bowl = () => {
      //handle frame 10 bowl 3
      if (currentFrame === 9 && scoreboard[currentFrame][1] !== null) {
        if ((scoreboard[9][3] === undefined && scoreboard[currentFrame][0] === 10) || (scoreboard[9][3] === undefined && scoreboard[currentFrame][0] + scoreboard[currentFrame][1] === 10)) {
          bowl3_Frame10()
        }
        else {
          endGame()
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
          if (newScoreboard[currentFrame][0] + newScoreboard[currentFrame][1] === 10) {
            displaySpareCheer()
          }
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
          displayStrikeCheer()
        }
          //in all cases
          calculateScoreBowl1(newScoreboard, bowl1Score)
          setScore(newScoreboard)
      }
  }

  return (
  <div className="app">
    <div className="scoreboard">
      {scoreboardToRender.slice(0,9).map((frame, i) => (
        <div>
      <Frame key={i} bowl1={frame[0]} bowl2={frame[1]} currentScore={frame[2]} frameNumber={i} bowl3={frame[3]}/>
      </div>
      ))}
       <div>
      <Frame10 bowl1={scoreboardToRender[9][0]} bowl2={scoreboardToRender[9][1]} currentScore={scoreboardToRender[9][2]} frameNumber={10} bowl3={scoreboardToRender[9][3]}/>
      </div>
    </div>
    <div className="bowlButtonContainer">
    <div className="cheerContainer">{cheer}</div>
    <button className="bowlButton" onClick={bowl}>Click to bowl!</button>
      <div className="cheerContainer">{cheer}</div>
    </div>
  </div>
  )
}

export default App