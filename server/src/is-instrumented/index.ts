import MezzuriteComponent from '../models/mezzuriteComponent';

function isInstrumented (filePath: string, framework: string): MezzuriteComponent {
  let isInstrumented = null;

  if (framework != null) {
    isInstrumented = {
      checks: {
        hasImport: true
      },
      filePath,
      name: 'componentName',
      type: framework
    };
  }

  return isInstrumented;
}

export default isInstrumented;
