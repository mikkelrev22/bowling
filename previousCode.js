const calculateScoreBowl1 = (newScoreboard) => {
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