import { join } from 'path';
import Project from 'ts-morph';

import MezzuriteComponent from '../models/mezzuriteComponent';
import * as generateComponent from './generateComponent';
import * as getComponentType from './getComponentType';
import processFile from './processFile';

describe('processFile.ts', () => {
  const project = new Project({
    addFilesFromTsConfig: false
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve the promise with the component data', () => {
    const filePath = join('.', 'server', 'src', 'filesystem', '__mocks__', 'exampleComponent.js');
    const result: MezzuriteComponent = {
      checks: {
        isInstrumented: true
      },
      filePath: 'path',
      name: 'fileName',
      type: 'react'
    };
    Object.defineProperty(getComponentType, 'default', { value: jest.fn(() => 'react') });
    Object.defineProperty(generateComponent, 'default', { value: jest.fn(() => result) });
    return processFile(filePath, project).then((component: MezzuriteComponent) => {
      expect(getComponentType.default).toHaveBeenCalledTimes(1);
      expect(generateComponent.default).toHaveBeenCalledTimes(1);
      expect(component).toMatchObject(result);
    });
  });

  it('should resolve the promise with a null value when the component data is null', () => {
    const filePath = join('.', 'server', 'src', 'filesystem', '__mocks__', 'exampleNotComponent.js');
    Object.defineProperty(getComponentType, 'default', { value: jest.fn(() => null) });
    return processFile(filePath, project).then((component: MezzuriteComponent) => {
      expect(getComponentType.default).toHaveBeenCalledTimes(1);
      expect(component).toBeNull();
    });
  });

  it('should resolve the promise with a null value when the file path does not exist', () => {
    const filePath = 'does not exist';
    return processFile(filePath, project).then((component: MezzuriteComponent) => {
      expect(component).toBeNull();
    });
  });

  it('should resolve the promise with a null value when the filePath is null', () => {
    const filePath = null;
    return processFile(filePath, project).then((component: MezzuriteComponent) => {
      expect(component).toBeNull();
    });
  });
});
