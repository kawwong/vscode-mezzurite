import isAngularModule from './isAngularModule';

describe('isAngular.ts', () => {
  it('should return false when fileContents is null', () => {
    expect(isAngularModule(null)).toBeFalsy();
  });

  it('should return false when fileContents does not contain @Component or @Module', () => {
    expect(isAngularModule('test')).toBeFalsy();
  });

  it('should return true when fileContents contains @Module', () => {
    expect(isAngularModule('@Module')).toBeTruthy();
  });
});
