import { join } from 'path';

import generateReact from './generateReact';

describe('generateReact.ts', () => {
  it('should generate a Mezzurite component for a react component written in javascript', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'reactInstrumentedJs.js');
    expect(generateReact(filePath))
      .toMatchObject({
        checks: {
          hasWithMezzurite: true
        },
        filePath: filePath,
        name: 'ReactInstrumented',
        type: 'react'
      });
  });

  it('should generate a Mezzurite component for a react component written in jsx', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'reactInstrumentedJsx.jsx');
    expect(generateReact(filePath))
      .toMatchObject({
        checks: {
          hasWithMezzurite: true
        },
        filePath: filePath,
        name: 'ReactInstrumented',
        type: 'react'
      });
  });

  it('should generate a Mezzurite component for a react component written in typescript', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'reactInstrumentedTs.ts');
    expect(generateReact(filePath))
      .toMatchObject({
        checks: {
          hasWithMezzurite: true
        },
        filePath: filePath,
        name: 'ReactInstrumented',
        type: 'react'
      });
  });

  it('should generate a Mezzurite component for a react component written in tsx', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'reactInstrumentedTsx.tsx');
    expect(generateReact(filePath))
      .toMatchObject({
        checks: {
          hasWithMezzurite: true
        },
        filePath: filePath,
        name: 'ReactInstrumented',
        type: 'react'
      });
  });

  it('should generate a Mezzurite component for a react component that has not been instrumented', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'reactNotInstrumented.js');
    expect(generateReact(filePath))
      .toMatchObject({
        checks: {
          hasWithMezzurite: false
        },
        filePath: filePath,
        name: 'ReactNotInstrumented',
        type: 'react'
      });
  });

  it('should generate a Mezzurite component for a react redux component', () => {
    const filePath = join('.', 'server', 'src', 'generateComponent', 'helpers', '__mocks__', 'reactRedux.js');
    expect(generateReact(filePath))
      .toMatchObject({
        checks: {
          hasWithMezzurite: false
        },
        filePath: filePath,
        name: 'ReactRedux',
        type: 'react'
      });
  });
});
