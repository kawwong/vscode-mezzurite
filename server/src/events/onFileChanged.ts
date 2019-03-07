import { resolve } from 'path';
import Project from 'ts-morph';

import MezzuriteComponent from '../models/mezzuriteComponent';
import processFile from '../utilities/processFile';

function onFilesChanged (components: MezzuriteComponent[], filePaths: string[], project: Project): Promise<MezzuriteComponent[]> {
  let updatedComponents: MezzuriteComponent[] = null;
  return Promise.all(
    filePaths.map((filePath: string) => processFile(filePath, project))
  )
    .then((changedComponents: MezzuriteComponent[]) => {
      const filtered = changedComponents.filter(component => component != null);
      updatedComponents = components.filter((component: MezzuriteComponent) => {
        return filtered.find((value: MezzuriteComponent) => {
          return resolve(value.filePath) !== resolve(component.filePath);
        }) != null;
      });

      changedComponents.forEach((changedComponent: MezzuriteComponent) => {
        if (changedComponent != null) {
          updatedComponents = [ ...updatedComponents, changedComponent ];
        }
      });

      return updatedComponents;
    })
    .catch((error: Error) => {
      throw(error);
    });
}

export default onFilesChanged;
