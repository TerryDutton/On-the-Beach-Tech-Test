const {expect} = require('chai'); 
const {jobLister} = require('./index.js'); 

describe('jobLister', () => {
  it('returns an empty string when passed an empty string.', () => {
    const input = ''; 
    expect(jobLister(input)).to.equal(''); 
  });
});