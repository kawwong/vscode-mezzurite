/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import Project from 'ts-morph';
import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  WorkspaceFolder
} from 'vscode-languageserver';

import MezzuriteComponent from './models/MezzuriteComponent';
import combineWorkspaceFolders from './utilities/combineWorkspaceFolders';
import processFile from './utilities/processFile';

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
const documents: TextDocuments = new TextDocuments();

let components: MezzuriteComponent[] = [];
const project = new Project({
  addFilesFromTsConfig: false
});

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: documents.syncKind,
			// Tell the client that the server supports code completion
      completionProvider: {
        resolveProvider: true
      }
    }
  };
});

connection.onInitialized(() => {
  connection.workspace.getWorkspaceFolders().then((folders: WorkspaceFolder[]) => {
    const files = combineWorkspaceFolders(folders);
    Promise.all(
      files.map((filePath: string) => {
        return processFile(filePath, project)
          .catch((error: Error) => {
            console.warn(`Unable to process ${filePath}: ${error}`);
            return null;
          });
      })
    )
    .then((results: MezzuriteComponent[]) => {
      components = results.filter((component: MezzuriteComponent) => component != null);
      connection.sendNotification('custom/mezzuriteComponents', { value: components });
    })
    .catch((error: Error) => connection.console.warn(error.message));
  });
});

documents.listen(connection);

connection.listen();
