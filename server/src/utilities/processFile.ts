import { readFile } from 'fs';
import Project from 'ts-morph';

import MezzuriteComponent from '../models/mezzuriteComponent';
import getComponentType from './getComponentType';
import generateComponent from './generateComponent';

function processFile (filePath: string, project: Project): Promise<MezzuriteComponent> {
  return new Promise((resolve: Function) => {
    if (filePath != null) {
      readFile(filePath, (error: Error, data: Buffer) => {
        if (error == null) {
          let componentData: MezzuriteComponent = null;
          const componentType = getComponentType(data.toString());
          if (componentType != null) {
            const sourceFile = project.addExistingSourceFile(filePath);
            componentData = generateComponent(componentType, filePath, sourceFile);
            project.removeSourceFile(sourceFile);
          }
          resolve(componentData);
        } else {
          resolve(null);
        }
      });
    } else {
      resolve(null);
    }
  });
}

export default processFile;
