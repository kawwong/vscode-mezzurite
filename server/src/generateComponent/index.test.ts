import generateComponent from '.';
import helpers from './helpers';
import MezzuriteComponent from '../models/mezzuriteComponent';
import Project from 'ts-morph';
import { join } from 'path';

describe('index.ts', () => {
  const component: MezzuriteComponent = {
    checks: {
      test: true
    },
    filePath: 'filePath',
    name: 'name',
    type: 'type'
  };

  const project = new Project({
    addFilesFromTsConfig: false
  });
  const sourceFile = project.addExistingSourceFile(
    join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'reactRedux.js')
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null when the componentType is null', () => {
    expect(generateComponent(null, null, null)).toBeNull();
  });

  it('should return null when the filePath is null', () => {
    expect(generateComponent('componentType', null, null)).toBeNull();
  });

  it('should return null when the sourceFile is null', () => {
    expect(generateComponent('componentType', 'filePath', null)).toBeNull();
  });

  it('should return the component when generateNgComponent is not null', () => {
    helpers.generateNgComponent = jest.fn(() => component);
    expect(generateComponent('ngComponent', 'filePath', sourceFile)).toMatchObject(component);
  });

  it('should return the component when generateNgModule is not null', () => {
    helpers.generateNgModule = jest.fn(() => component);
    expect(generateComponent('ngModule', 'filePath', sourceFile)).toMatchObject(component);
  });

  it('should return the component when generateNgModule is not null', () => {
    helpers.generateReact = jest.fn(() => component);
    expect(generateComponent('react', 'filePath', sourceFile)).toMatchObject(component);
  });
});
