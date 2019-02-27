import { sync } from 'globby';

function extractSourceFiles (rootDirectory: string): string[] {
  let normalized = rootDirectory;
  if (rootDirectory.startsWith('file:///')) {
    normalized = rootDirectory.substring(8);
    normalized = normalized.replace('%3A', ':');
  }
  const files = sync([ `${normalized}/**/*.+(js|jsx|ts|tsx)`, '!**/node_modules' ]);
  return files;
}

export default extractSourceFiles;
