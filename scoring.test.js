const { expect } = require('chai')
const bowl = require('./scoring.js')
/*
Test whether bowl is a function
*/
describe('bowl', () => {
  it('should be a function', ()=>{
    expect(bowl).to.be.a('function')
  })
  it('should return an integer between 0 and 10, inclusive', ()=>{
    expect(bowl()).to.be.within(0, 10)
  })
})