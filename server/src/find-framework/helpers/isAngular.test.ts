import isAngular from './isAngular';

describe('isAngular.ts', () => {
  it('should return false when fileContents is null', () => {
    expect(isAngular(null)).toBeFalsy();
  });

  it('should return false when fileContents does not contain @Component or @Module', () => {
    expect(isAngular('test')).toBeFalsy();
  });

  it('should return true when fileContents contains @Component', () => {
    expect(isAngular('@Component')).toBeTruthy();
  });

  it('should return true when fileContents contains @Module', () => {
    expect(isAngular('@Module')).toBeTruthy();
  });
});
