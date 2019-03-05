import { join } from 'path';
import Project from 'ts-morph';

import MezzuriteComponent from '../models/mezzuriteComponent';
import processFile from '../utilities/processFile';

function onFileChanged (components: MezzuriteComponent[], filePath: string, project: Project): Promise<MezzuriteComponent[]> {
  let updatedComponents: MezzuriteComponent[] = null;
  return processFile(filePath, project)
    .then((changedComponent: MezzuriteComponent) => {
      if (changedComponent != null) {
        const updateIndex = components.findIndex((component: MezzuriteComponent) => {
          return join(changedComponent.filePath) === join(component.filePath);
        });
        if (updateIndex > -1) {
          updatedComponents = components.map((component: MezzuriteComponent) => {
            if (join(changedComponent.filePath) === join(component.filePath)) {
              return changedComponent;
            } else {
              return component;
            }
          });
        } else {
          updatedComponents = [ ...components, changedComponent ];
        }
      } else {
        updatedComponents = components.filter((component: MezzuriteComponent) => {
          return join(component.filePath) !== join(filePath);
        });
      }
      return updatedComponents;
    })
    .catch((error: Error) => {
      throw(error);
    });
}

export default onFileChanged;
