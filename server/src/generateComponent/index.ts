import MezzuriteComponent from '../models/mezzuriteComponent';
import helpers from './helpers';

function generateComponent (componentType: string, filePath: string): MezzuriteComponent {
  let component = null;

  if (componentType != null) {
    if (componentType === 'ngComponent') {
      component = helpers.generateNgComponent(filePath);
    } else if (componentType === 'ngModule') {
      component = helpers.generateNgModule(filePath);
    }
  }

  return component;
}

export default generateComponent;
