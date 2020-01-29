
//array that is the scoreboard

let scoreboard = []

//list of functions


const calculateTotalScore = () => {

}

//function that calculates score each frame accounting for spares and strikes

const calculateFrameScore = () => {

}
//function that 'bowls' a random number between 0 and 10 & adds it to scoreboard

const bowl = () => {
  //random number between 0 and  10
  return Math.floor(Math.random()*11)
}
//function that adds pinScore to frame
const bowlAFrame = () => {
  //create currentFrame
  let frame = []
  //invoke bowl function to see how many pins were knocked down in first bowl
  let firstBowl = bowl()
  //find the number of remaining pins
  let remainingPins = 10-firstBowl
  //push first bowl to frame
  frame.push(firstBowl)
  if (remainingPins) {
    let secondBowlMax = remainingPins + 1
    //Array.from({length: remainingPins+1}, (v,i)=> i)
    let secondBowl = Math.floor(Math.random()*secondBowlMax)
    frame.push(secondBowl)
  }
  else {frame.push(0)}
  scoreboard.push(frame)
}
//play a game
const playAGame = () => {
  let frame = 1
  while (frame < 11) {
    bowlAFrame()
    frame++
  }
}
//function that identifies when the game is over

const checkGameEnd = () => {

}

module.exports = {
  Bowl: bowl,
  Scoreboard: scoreboard,
  CalculateTotalScore: calculateTotalScore,
  CheckGameEnd: checkGameEnd,
  BowlAFrame: bowlAFrame,
  CalculateFrameScore: calculateFrameScore,
  PlayAGame: playAGame
}