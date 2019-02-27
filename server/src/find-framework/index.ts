import helpers from './helpers';

function findFramework (fileContents: string): string {
  let framework = null;

  if (helpers.isAngular(fileContents)) {
    framework = 'angular';
  } else if (helpers.isReact(fileContents)) {
    framework = 'react';
  }

  return framework;
}

export default findFramework;
