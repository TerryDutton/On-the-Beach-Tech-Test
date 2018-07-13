exports.jobLister = function(str){
  const arrayOfJobs = str.split('\n').map(job => job.replace(/\W/g, ''));
  
  return arrayOfJobs.reduce((acc, [job = '', dependsOn]) => {
    if (acc.includes('Error')) return acc;
    if (job === dependsOn) return 'Error: sequence contains a job with itself as a dependency.';

    const alreadyHasJob = acc.includes(job);
    const alreadyHasDep = acc.includes(dependsOn);
    if (alreadyHasJob && alreadyHasDep) return 'Error: sequence contains a circular set of dependencies.';
    return `${dependsOn && !alreadyHasDep ? dependsOn : ''}${acc}${alreadyHasJob ? '' : job}`; 
  }, '');
}

/*
Notes
Line 2: Turns the input into an array of letters by splitting along the newline and then removing anything that isn't a letter. Jobs with dependencies become pairs of letters. 

Line 4: The string passed from reduce is put into variables with array destructuring. 'Job' is set as an empty string by default because if the function is initially passed an empty string this cannot be destructured. If only one letter was passed, 'dependsOn' is undefined.

Line 5: Causes error messages to be passed unchanged through the reduce loop and back to the user. 

Line 10: If both job and dependency are in the accumulator, they have already been processed and their dependencies accounted for. If both turn up a second time at the same time this way, there is a circular dependency.

Line 11: Return the string. If the dependency isn't in the accumulator, put it on the left; if the job isn't in the accumulator, put it on the right. This way, dependencies will always come before the job that depends on them. 
*/