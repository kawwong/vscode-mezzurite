import { join } from 'path';

import generateNgModule from './generateNgModule';

describe('generateNgModule.ts', () => {
  it('should return null when filePath is null', () => {
    expect(generateNgModule(null)).toBeNull();
  });

  it('should generate a Mezzurite component from an ngModule file passing all the checks', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'ngModuleInstrumented.ts');
    expect(generateNgModule(filePath))
      .toMatchObject({
        checks: {
          hasAngularPerfModule: true,
          hasImport: true,
          hasRoutingServiceStart: true
        },
        filePath,
        name: 'InstrumentedModule',
        type: 'ngModule'
      });
  });

  it('should generate a Mezzurite component from an ngModule file passing none of the checks', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'ngModuleNotInstrumented.ts');
    expect(generateNgModule(filePath))
      .toMatchObject({
        checks: {
          hasAngularPerfModule: false,
          hasImport: false,
          hasRoutingServiceStart: false
        },
        filePath,
        name: 'NotInstrumentedModule',
        type: 'ngModule'
      });
  });
});
