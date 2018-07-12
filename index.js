exports.jobLister = function(str){
  const arrayOfJobs = str.split('\n').map(job => job.replace(/\W/g, ''));

  return arrayOfJobs.reduce((acc, jobInfo) => {
    if (acc.includes('Error') || acc.includes(jobInfo) || jobInfo === '') return acc; 
    if (jobInfo.length === 1) return acc + jobInfo; 

    else {
      const [job, dependsOn] = [...jobInfo];
      if (job === dependsOn) return 'Error: sequence contains a job with itself as a dependency.';
      if ([job, dependsOn].every(letter => !acc.includes(letter))) acc += dependsOn + job;
      else if (acc.includes(job)) acc = dependsOn + acc; 
      else acc += job;
      return acc.indexOf(dependsOn) === acc.lastIndexOf(dependsOn) ? acc : 'Error: sequence contains a circular set of dependencies.';
    }
  }, '');
}