import MezzuriteComponent from '../models/mezzuriteComponent';
import helpers from './helpers';
import { SourceFile } from 'ts-morph';

function generateComponent (componentType: string, filePath: string, sourceFile: SourceFile): MezzuriteComponent {
  let component = null;

  if (componentType != null) {
    if (componentType === 'ngComponent') {
      component = helpers.generateNgComponent(filePath, sourceFile);
    } else if (componentType === 'ngModule') {
      component = helpers.generateNgModule(filePath, sourceFile);
    } else if (componentType === 'react') {
      component = helpers.generateReact(filePath, sourceFile);
    }
  }

  return component;
}

export default generateComponent;
