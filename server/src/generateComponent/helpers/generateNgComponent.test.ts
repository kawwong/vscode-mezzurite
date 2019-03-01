import { join } from 'path';

import generateNgComponent from './generateNgComponent';

describe('generateNgComponent.ts', () => {
  it('should return null when filePath is null', () => {
    expect(generateNgComponent(null)).toBeNull();
  });

  it('should generate a Mezzurite component from an ngModule file passing all the checks', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'ngComponentInstrumented.ts');
    expect(generateNgComponent(filePath))
      .toMatchObject({
        checks: {
          hasMezzuriteDirective: true
        },
        filePath,
        name: 'InstrumentedComponent',
        type: 'ngComponent'
      });
  });

  it('should generate a Mezzurite component from an ngModule file not passing all the checks', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'ngComponentNotInstrumented.ts');
    expect(generateNgComponent(filePath))
      .toMatchObject({
        checks: {
          hasMezzuriteDirective: false
        },
        filePath,
        name: 'NotInstrumentedComponent',
        type: 'ngComponent'
      });
  });

  it('should generate a Mezzurite component from an ngModule file using templateUrl passing all the checks', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'ngComponentTemplateUrlInstrumented.ts');
    expect(generateNgComponent(filePath))
      .toMatchObject({
        checks: {
          hasMezzuriteDirective: true
        },
        filePath,
        name: 'TemplateUrlInstrumentedComponent',
        type: 'ngComponent'
      });
  });

  it('should generate a Mezzurite component from an ngModule file using templateUrl not passing all the checks', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'ngComponentTemplateUrlNotInstrumented.ts');
    expect(generateNgComponent(filePath))
      .toMatchObject({
        checks: {
          hasMezzuriteDirective: false
        },
        filePath,
        name: 'TemplateUrlInstrumentedComponent',
        type: 'ngComponent'
      });
  });
});
