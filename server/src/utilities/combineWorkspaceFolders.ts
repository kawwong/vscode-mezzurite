import { WorkspaceFolder } from 'vscode-languageserver';

import extractSourceFiles from './extractSourceFiles';

function combineWorkspaceFolders (folders: WorkspaceFolder[]): string[] {
  let allFiles: string[] = [];
  if (folders != null && folders.length > 0) {
    folders.forEach((folder: WorkspaceFolder) => {
      if (folder != null) {
        const folderFiles = extractSourceFiles(folder.uri)
          .filter((file: string) => {
            return file != null;
          });
        allFiles = [ ...allFiles, ...folderFiles ];
      }
    });
  }

  return allFiles;
}

export default combineWorkspaceFolders;
