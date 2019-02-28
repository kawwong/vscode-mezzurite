import isAngularComponent from './isAngularComponent';

describe('isAngular.ts', () => {
  it('should return false when fileContents is null', () => {
    expect(isAngularComponent(null)).toBeFalsy();
  });

  it('should return false when fileContents does not contain @Component or @Module', () => {
    expect(isAngularComponent('test')).toBeFalsy();
  });

  it('should return true when fileContents contains @Component', () => {
    expect(isAngularComponent('@Component')).toBeTruthy();
  });
});
