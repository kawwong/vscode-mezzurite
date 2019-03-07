import Project from 'ts-morph';

import MezzuriteComponent from '../models/mezzuriteComponent';
import * as processFile from '../utilities/processFile';
import onFileChanged from './onFileChanged';

describe('onFileChanged.ts', () => {
  const components: MezzuriteComponent[] = [
    {
      checks: {
        test: true
      },
      filePath: 'filePath',
      name: 'name',
      type: 'componentType'
    },
    {
      checks: {
        test: true
      },
      filePath: 'differentFilePath',
      name: 'name',
      type: 'componentType'
    }
  ];

  const project = new Project({
    addFilesFromTsConfig: false
  });

  it('should delete the component with the filePath when processFile returns a null value', () => {
    Object.defineProperty(processFile, 'default', { value: jest.fn(() => new Promise((resolve) => resolve(null))) });
    return onFileChanged(components, 'filePath', project)
      .then((updatedComponents: MezzuriteComponent[]) => [
        expect(updatedComponents).toMatchObject([
          {
            checks: {
              test: true
            },
            filePath: 'differentFilePath',
            name: 'name',
            type: 'componentType'
          }
        ])
      ]);
  });

  it('should handle when processFile returns a component that already exists', () => {
    Object.defineProperty(processFile, 'default', { value: jest.fn(() => new Promise((resolve) => resolve(components[0]))) });
    return onFileChanged(components, 'filePath', project)
      .then((updatedComponents: MezzuriteComponent[]) => {
        expect(updatedComponents).toMatchObject([ components[1], components[0] ]);
      });
  });

  it('should handle when processFile returns a component with new data that already exists', () => {
    const updated: MezzuriteComponent = {
      checks: {
        test: false
      },
      filePath: 'filePath',
      name: 'name',
      type: 'componentType'
    };
    Object.defineProperty(processFile, 'default', { value: jest.fn(() => new Promise((resolve) => resolve(updated))) });
    return onFileChanged(components, 'filePath', project)
      .then((updatedComponents: MezzuriteComponent[]) => {
        expect(updatedComponents).toMatchObject([ components[1], updated ]);
      });
  });

  it('should handle when processFile returns a new component', () => {
    const updated: MezzuriteComponent = {
      checks: {
        test: false
      },
      filePath: 'newFilePath',
      name: 'name',
      type: 'componentType'
    };
    Object.defineProperty(processFile, 'default', { value: jest.fn(() => new Promise((resolve) => resolve(updated))) });
    return onFileChanged(components, 'newFilePath', project)
      .then((updatedComponents: MezzuriteComponent[]) => {
        expect(updatedComponents).toMatchObject([ ...components, updated ]);
      });
  });

  it('should handle when processFile throws an error', () => {
    Object.defineProperty(processFile, 'default', { value: jest.fn(() => new Promise((resolve, reject) => reject(new Error('Error')))) });
    expect.assertions(1);
    return onFileChanged(components, 'filePath', project)
      .catch((error: Error) => {
        expect(error).toMatchObject(new Error('Error'));
      });
  });
});
