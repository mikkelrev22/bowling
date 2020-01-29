
//array that is the scoreboard

let scoreboard = []

//list of functions
//function that calculates score each frame accounting for spares and strikes

const calculateScore = () => {

}

//function that 'bowls' a random number between 0 and 10 & adds it to scoreboard

const bowl = () => {
  return Math.floor(Math.random()*11)
}

//function that identifies when the game is over

const checkGameEnd = () => {

}

module.exports = {
  Bowl: bowl,
  Scoreboard: scoreboard,
  CalculateScore: calculateScore,
  CheckGameEnd: checkGameEnd
}