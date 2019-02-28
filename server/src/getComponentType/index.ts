import helpers from './helpers';

function getComponentType (fileContents: string): string {
  let componentType = null;

  if (helpers.isAngularComponent(fileContents)) {
    componentType = 'angularComponent';
  } else if (helpers.isAngularModule(fileContents)) {
    componentType = 'angularModule';
  } else if (helpers.isReact(fileContents)) {
    componentType = 'react';
  }

  return componentType;
}

export default getComponentType;
