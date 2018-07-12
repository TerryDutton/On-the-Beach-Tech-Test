# On-the-Beach-Tech-Test

## Installation

Fork and clone the repository, and run `$npm install` to install dependencies. This repo uses chai v.4.1.2 and mocha v.5.2.0. 

Run `$npm test` to run the tests.

## Code Breakdown

The `jobLister` function takes a sequence of jobs and dependencies in the form of a string, like so: 

```
a =>
b => c
c =>
```

The input is first split along the newlines into an array, and then remapped to remove anything that isn't a letter:

```
const arrayOfJobs = str.split('\n').map(job => job.replace(/\W/g, ''));
```
The result is an array containing either single letters for jobs with no dependencies, or pairs of letters for those that do. This is then processed via a reduce statement with an empty string as its accumulator. Jobs wil be added to the accumulator as it progresses; if an error is found in the input (a job that depends on itself, or a circular dependency) the accumulator is wiped and replaced with an error message.

First is a quick set of checks - if the accumulator is an error message, if the accumulator already contains the job entry being processed, or the job is an empty string, return the accumulator unchanged:
```
return arrayOfJobs.reduce((acc, jobInfo) => {
  if (acc.includes('Error') || acc.includes(jobInfo) || jobInfo === '') return acc; 
```
 This ensures errors and empty inputs trickle through to the end of the reduce, and that jobs aren't added multiple times.

If the job makes it through (and therefore isn't in the accumulator), see if it's a non-dependent job; if it is, add it to the accumulator and return.
```
  if (jobInfo.length === 1) return acc + jobInfo; 
```

If it is a dependent, things get a little complicated. For the sake of clarity, split the jobInfo string into the job and the job it depends on:
```
  const [job, dependsOn] = [...jobInfo];
```

... and check if the job and its the job it depends on are equal:
 ```
  if (job === dependsOn) return 'Error: sequence contains a job with itself as a dependency.';
```
If they are, then the job depends on itself. Return an error instead of the accumulator. Because of the initial check at the beginning to see if acc contains 'Error' this message will continually be returned through the reduce sequence until it's ejected back to the user. 

If they're different, we need to check if either one is already in the accumulator. If neither are:
```
  if ([job, dependsOn].every(letter => !acc.includes(letter))) acc += dependsOn + job;
```
... then add them both to the end, dependency first.

 If the job is in the accumulator, but the job it depends on isn't:
``` 
  else if (acc.includes(job)) acc = dependsOn + acc; 
```
...add the dependency to the beginning of the accumulator, so it comes before the job that depends on it. This also functions as the precursor to checking for dependency-loops, explained momentarily.

 If the accumulator doesn't include the job, add the job to the end: 
```
  else acc += job;
```

One check remains. As mentioned above, if the accumulator includes a job that this iteration of the reduce-function is carrying the dependency for, the dependency is added to the beginning of the accumulator. If a circular dependency exists, this should cause it to be added twice. So we can check the string from both ends for first instance of the index of the dependency: if they're the same, then only one exists; return the accumulator. But if they're different, there's a circle; return an error.
```
  return acc.indexOf(dependsOn) === acc.lastIndexOf(dependsOn) ? acc : 'Error: sequence contains a circular set of dependencies.';
```