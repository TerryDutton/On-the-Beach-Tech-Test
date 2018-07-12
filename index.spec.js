const {expect} = require('chai'); 
const {jobLister} = require('./index.js'); 

describe('jobLister', () => {
  it('returns an empty string when passed an empty string.', () => {
    const input = ''; 
    expect(jobLister(input)).to.equal(''); 
  });

  it('when passed a list of jobs without dependencies, returns a string containing those jobs.', () => {
    const input = 
   `a =>
    b =>
    c =>`;
    expect(jobLister(input)).to.equal('abc');
  });
});