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
    // I placed the string on a separate line to 'input' for neatness and to avoid tabbing issues that can occur with multiline strings.
    expect(jobLister(input)).to.equal('abc');
  });

  it('when passed a list of jobs with dependencies, returns a string of jobs with dependencies listed after the jobs they depend on.', () => {
    let input = 
   `a =>
    b => c
    c =>`;
    expect(jobLister(input)).to.equal('acb');

    input = 
   `a => 
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
    const input = 
   `a =>
    b =>
    c => c`;
    expect(jobLister(input)).to.equal('Error: sequence contains a job with itself as a dependency.');
  });
});