exports.jobLister = function(str){
  const arrayOfJobs = str.split('\n').map(job => job.replace(/\W/g, '')); //Splits input into an array of letters. Jobs with dependencies become pairs of letters. 
  
  return arrayOfJobs.reduce((acc, jobInfo) => {
    if (acc.includes('Error')) return acc;

    const [job = '', dependsOn] = [...jobInfo]; //If an empty string is passed it won't spread, making 'job' undefined, so 'job' is set as an empty string by default to avoid problems.
    if (job === dependsOn) return 'Error: sequence contains a job with itself as a dependency.';
    if (acc.includes(job) && acc.includes(dependsOn)) return 'Error: sequence contains a circular set of dependencies.';
    //If both the job and the dependency being processed are already in the accumulator, they must both have already come through as either independent jobs or as a different job-dependency pair. If both are being processed a second time, there's a circular dependency.
    if (dependsOn && !acc.includes(dependsOn)) acc = dependsOn + acc; 
    if (!acc.includes(job)) acc += job; 
    return acc; 
  }, '');
}