const fs = require('fs');
import processFiles from './processFiles';

describe('processFiles.ts', () => {
  beforeEach(() => {
    fs.readFile = jest.fn();
  });

  it('should return a promise for wrapping promises for each file', () => {
    expect(processFiles([ 'test', 'src/test' ], () => false))
      .toEqual(Promise.all([
        new Promise(() => false),
        new Promise(() => false)
      ]));
  });
});
