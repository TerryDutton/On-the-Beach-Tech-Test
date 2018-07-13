const {expect} = require('chai'); 
const {jobLister} = require('./index.js'); 

describe('jobLister', () => {
  it('returns an empty string when passed an empty string.', () => {
    const input = ''; 
    expect(jobLister(input)).to.equal(''); 
  });

  it('when passed a list of jobs without dependencies, returns a string containing those jobs.', () => {
    const input = `a =>
    b =>
    c =>`;
    expect(jobLister(input)).to.equal('abc');
  });

  it('when passed a list of jobs with dependencies, returns a string of jobs with dependencies listed after the jobs they depend on.', () => {
    let input = `a =>
    b => c
    c =>`;
    expect(jobLister(input)).to.equal('cab');

    input = `a => 
    b => c
    c => f
    d => a
    e => b
    f => `;
    const output = jobLister(input); 
    const expectedSeqs = [/f.*c/, /c.*b/, /b.*e/, /a.*d/];
    /*We expect f before c, c before b, b before e and a before d, but they might have other letters between them, 
    so simply checking for pairs of letters won't work.*/
    expect(expectedSeqs.every(seq => seq.test(output))).to.be.true;
    expect([...'abcdef'].every(letter => output.includes(letter))).to.be.true;
    expect(output.length).to.equal(6);  
  });

  it('returns an error when passed a sequence in which a job is dependent upon itself.', () => {
    const input = `a =>
    b =>
    c => c`;
    expect(jobLister(input)).to.equal('Error: sequence contains a job with itself as a dependency.');
  });

  it('returns an error when passed a sequence with a circular set of dependencies.', () => {
    let input = `a => 
    b => c
    c => f
    d => a
    e => 
    f => b`;
    expect(jobLister(input)).to.equal('Error: sequence contains a circular set of dependencies.');

    input = `f => a
     a => b
     b => c
     c => d
     d => e
     e => f`;
     expect(jobLister(input)).to.equal('Error: sequence contains a circular set of dependencies.');
  });
});