import { sync } from 'globby';
import { join } from 'path';

function extractSourceFiles (rootDirectory: string): string[] {
  let normalized = rootDirectory;
  // TODO: Check if other OSs besides Windows have similar parsing issues.
  if (rootDirectory.startsWith('file:')) {
    normalized = rootDirectory.substring(4);
    let colonIndex = normalized.indexOf('%3A');
    if (colonIndex > -1) {
      normalized = normalized.substring(colonIndex + 3);
    } else {
      colonIndex = normalized.indexOf(':');
      normalized = normalized.substring(colonIndex + 1);
    }
  }
  const files = sync([ join(normalized, '**', '*.+(js|jsx|ts|tsx)'), join('!**', 'node_modules') ]);
  return files;
}

export default extractSourceFiles;
