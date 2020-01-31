
//array that is the scoreboard

let scoreboard = []
let score = 0
//list of functions

const calculateTotalScore = (scoreboard) => {
  for (let i = 2; i <= scoreboard.length; i++) {
    // scoring for a spare
    if (scoreboard[i-2][2] === '/') {
      scoreboard[i-2][2] = 10 + scoreboard[i-1][0]
      score += scoreboard[i-2][2]
    }
    // scoring for a lone strike
    if (scoreboard[i-2][2] === 'X' && scoreboard[i-1][2] !== 'X') {
      scoreboard[i-2][2] = 10 + scoreboard[i-1][0] + scoreboard[i-1][1]
      score += scoreboard[i-2][2]
    }
    // fix this function; it is not necessarily 30
    if (scoreboard[i-2][2] === 'X' && scoreboard[i-1][2] === 'X') {
      scoreboard[i-2][2] = 30
      score += scoreboard[i-2][2]
    }
  }
}

//function that calculates score each frame and adds a flag for spares and strikes

const calculateFrameScore = (frame) => {
  if (frame[0] + frame[1] !== 10) {
    frame[2] = frame[0] + frame[1]
    score += frame[2]
  }
  if (frame[0] + frame[1] === 10) {
    frame[2] = '/'
  }
  if (frame[0] === 10) frame[2] = 'X'
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
  //
  if (remainingPins) {
    let secondBowlMax = remainingPins + 1
    //Array.from({length: remainingPins+1}, (v,i)=> i)
    let secondBowl = Math.floor(Math.random()*secondBowlMax)
    frame.push(secondBowl)
  }
  else {frame.push(0)}
  calculateFrameScore(frame)
  scoreboard.push(frame)
  calculateTotalScore(scoreboard)
}
//play a game
const playAGame = () => {
  let frame = 1
  while (frame < 11) {
    bowlAFrame()
    frame++
  }
  console.log(scoreboard, score)
}
playAGame()

module.exports = {
  Bowl: bowl,
  Scoreboard: scoreboard,
  CalculateTotalScore: calculateTotalScore,
  BowlAFrame: bowlAFrame,
  CalculateFrameScore: calculateFrameScore,
  PlayAGame: playAGame
}