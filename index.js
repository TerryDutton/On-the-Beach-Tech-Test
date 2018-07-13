exports.jobLister = function(str){
  const arrayOfJobs = str.split('\n').map(job => job.replace(/\W/g, '')); //Splits input into an array of letters. Jobs with dependencies become pairs of letters. 
  
  return arrayOfJobs.reduce((acc, jobInfo) => {
    if (acc.includes('Error')) return acc;

    const [job = '', dependsOn] = [...jobInfo]; 
    if (job === dependsOn) return 'Error: sequence contains a job with itself as a dependency.';
    if (acc.includes(job) && acc.includes(dependsOn)) return 'Error: sequence contains a circular set of dependencies.';
    if (dependsOn && !acc.includes(dependsOn)) acc = dependsOn + acc; 
    if (!acc.includes(job)) acc += job; 
    return acc; 
  }, '');
}