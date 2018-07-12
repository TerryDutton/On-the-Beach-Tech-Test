exports.jobLister = function(str){
  const arrayOfJobs = str.split('\n').map(job => job.replace(/\W/g, ''));

  const {jobs, dependentPairs} = arrayOfJobs.reduce((acc, jobStr) => {
    acc.jobs += jobStr[0] || '';
    if (jobStr.length > 1) acc.dependentPairs.push(jobStr);
    return acc; 
  }, {jobs: '', dependentPairs: []});

  return dependentPairs.reduce((jobList, [job, dep]) => {
    const regexp = new RegExp(`[${job}${dep}]`, 'g'); 
    return jobList.replace(regexp, match => {
      if (match === job) return `${dep}${job}`; 
      return '';
    });
  }, jobs);
}