const globby = require('globby');
import extractSourceFiles from './extractSourceFiles';

describe('extractSourceFiles.ts', () => {
  beforeAll(() => {
    globby.sync = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not error out', () => {
    extractSourceFiles('test');
    expect(globby.sync).toHaveBeenLastCalledWith([ `test\\**\\*.+(js|jsx|ts|tsx)`, '!**\node_modules' ]);
  });

  it('should handle a Windows style path', () => {
    extractSourceFiles('file:///c:/Users/kawwong/Documents/Repositories/Mezzurite');
    expect(globby.sync).toHaveBeenLastCalledWith([ `\\Users\\kawwong\\Documents\\Repositories\\Mezzurite\\**\\*.+(js|jsx|ts|tsx)`, '!**\\node_modules' ]);
  });

  it('should handle a Windows style path with an escaped colon', () => {
    extractSourceFiles('file:///c%3A/Users/kawwong/Documents/Repositories/Mezzurite');
    expect(globby.sync).toHaveBeenLastCalledWith([ `\\Users\\kawwong\\Documents\\Repositories\\Mezzurite\\**\\*.+(js|jsx|ts|tsx)`, '!**\\node_modules' ]);
  });
});
