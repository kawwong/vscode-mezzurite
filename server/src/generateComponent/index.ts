import MezzuriteComponent from '../models/mezzuriteComponent';
import generateNgModule from './helpers/generateNgModule';

function generateComponent (componentType: string, filePath: string): MezzuriteComponent {
  let component = null;

  if (componentType != null) {
    if (componentType === 'ngModule') {
      component = generateNgModule(filePath);
    }
  }

  return component;
}

export default generateComponent;
