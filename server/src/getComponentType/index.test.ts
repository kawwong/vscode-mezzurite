import findFramework from '.';
import helpers from './helpers';

describe('index.ts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null when the input does not return true for any framework', () => {
    helpers.isAngular = jest.fn(() => false);
    helpers.isReact = jest.fn(() => false);
    const framework = findFramework('test');
    expect(framework).toBeNull();
  });

  it('should return angular when isAngular is true', () => {
    helpers.isAngular = jest.fn(() => true);
    helpers.isReact = jest.fn(() => false);
    const framework = findFramework('test');
    expect(framework).toBe('angular');
  });

  it('should return react when isReact is true', () => {
    helpers.isAngular = jest.fn(() => false);
    helpers.isReact = jest.fn(() => true);
    const framework = findFramework('test');
    expect(framework).toBe('react');
  });
});
