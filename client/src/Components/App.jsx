import React, { useState }  from 'react'

function Frame ({key, bowl1, bowl2, currentScore}) {
return <div className="frame">
{bowl1.text}{bowl2.text}{key.text}{currentScore.text} 
</div>
}

function App() {
  const [scoreboard, setScore] = useState([])
  // const [currentFrame, setCurrentFrame] = useState([]) I don't think this is necessary either
  // const [bowl, setBowl] = useState(0) I think this may be unneccesary

  return (
  <div className="app">
    <div className="scoreboard">
      {scoreboard.map((frame, i) => (
      <Frame key={i} bowl1={frame[0]} bowl2={frame[1]} currentScore={frame[2]}/>
      ))}
    </div>
  </div>
  )
}

export default App