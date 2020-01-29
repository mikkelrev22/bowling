const { expect } = require('chai')
const { Bowl, Scoreboard,  CalculateScore, CheckGameEnd, PinScore} = require('./scoring.js')
/*
Test whether bowl is a function and if returns a number between 0 and 10
*/
describe('bowl', () => {
  it('should be a function', ()=>{
    expect(Bowl).to.be.a('function')
  })
  it('should return an integer between 0 and 10, inclusive', ()=>{
    expect(Bowl()).to.be.within(0, 10)
  })
})
describe('PinScore', ()=> {
  it('should be a function', ()=> {
    expect(PinScore()).to.be.a('function')
  })
  it('should ')
})