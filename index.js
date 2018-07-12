exports.jobLister = function(str){
  const arrayOfJobs = str.split('\n').map(job => job.replace(/\W/g, ''));

  let jobs = '';
  const dependentPairs = []; 

  for (let i = 0; i < arrayOfJobs.length; i++){
    jobs += arrayOfJobs[i][0] || ''; 
    if (arrayOfJobs[i].length > 1){
      if (arrayOfJobs[i][0] === arrayOfJobs[i][1]) return 'Error: sequence contains a job with itself as a dependency.';
      dependentPairs.push(arrayOfJobs[i]);
    }
  }

  const answer = dependentPairs.reduce((jobList, [job, dep]) => {
    const regexp = new RegExp(`[${job}${dep}]`, 'g'); 
    return jobList.replace(regexp, match => {
      if (match === job) return `${dep}${job}`; 
      return '';
    });
  }, jobs);

  if (dependentPairs.every(([job, dep]) => {
    const regexp = new RegExp(`${dep}.*${job}`);
    return regexp.test(answer);
  })) return answer;
  else return 'Error: sequence contains a circular set of dependencies.';
}