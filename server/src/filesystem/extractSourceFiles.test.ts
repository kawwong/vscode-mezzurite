import extractSourceFiles from './extractSourceFiles';
import globby = require('globby');

describe('extractSourceFiles.ts', () => {
  beforeAll(() => {
    jest.spyOn(globby, 'sync');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not error out', () => {
    extractSourceFiles('test');
    expect(globby.sync).toHaveBeenLastCalledWith([ `test/**/*.+(js|jsx|ts|tsx)`, '!**/node_modules' ]);
  });

  it('should handle a Windows style path', () => {
    extractSourceFiles('file:///c:/Users/kawwong/Documents/Repositories/Mezzurite');
    expect(globby.sync).toHaveBeenLastCalledWith([ `c:/Users/kawwong/Documents/Repositories/Mezzurite/**/*.+(js|jsx|ts|tsx)`, '!**/node_modules' ]);
  });

  it('should handle a Windows style path with an escaped colon', () => {
    extractSourceFiles('file:///c%3A/Users/kawwong/Documents/Repositories/Mezzurite');
    expect(globby.sync).toHaveBeenLastCalledWith([ `c:/Users/kawwong/Documents/Repositories/Mezzurite/**/*.+(js|jsx|ts|tsx)`, '!**/node_modules' ]);
  });
});
