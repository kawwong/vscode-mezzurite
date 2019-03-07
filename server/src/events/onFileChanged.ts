import { resolve } from 'path';
import Project from 'ts-morph';

import MezzuriteComponent from '../models/mezzuriteComponent';
import processFile from '../utilities/processFile';

function onFileChanged (components: MezzuriteComponent[], filePath: string, project: Project): Promise<MezzuriteComponent[]> {
  let updatedComponents: MezzuriteComponent[] = null;
  return processFile(filePath, project)
    .then((changedComponent: MezzuriteComponent) => {
      updatedComponents = components.filter((component: MezzuriteComponent) => {
        return resolve(component.filePath) !== resolve(filePath);
      });

      if (changedComponent != null) {
        updatedComponents = [ ...updatedComponents, changedComponent ];
      }

      return updatedComponents;
    })
    .catch((error: Error) => {
      throw(error);
    });
}

export default onFileChanged;
