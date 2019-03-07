/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { join } from 'path';
import Project from 'ts-morph';
import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
  WorkspaceFolder
} from 'vscode-languageserver';
import MezzuriteComponent from './models/mezzuriteComponent';

import normalizeWorkspacePath from './utilities/normalizeWorkspacePath';
import debounce from './utilities/debounce';
import onFilesChanged from './events/onFileChanged';

const chokidar = require('chokidar');

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
const documents: TextDocuments = new TextDocuments();

let state: MezzuriteComponent[] = [];

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
    const folderPath = normalizeWorkspacePath(folders[0].uri);
    let events = [];
    chokidar
      .watch(join(folderPath), {
        ignored: /node_modules/
      })
      .on('all', (event, path) => {
        if (event === 'add' || event === 'unlink' || event === 'change') {
          if (String(path).endsWith('.js')) {
            events.push({
              event,
              path
            });
          }
        }
        onAdd();
      });

    const onAdd = debounce(() => {
      onFilesChanged(state, events.map(event => event.path), project)
        .then((updatedComponents: MezzuriteComponent[]) => {
          state = updatedComponents;
          connection.sendNotification('custom/mezzuriteComponents', { value: state });
          events = [];
        });

    }, 250, false);
    // const files = combineWorkspaceFolders(folders);
    // Promise.all(
    //   files.map((filePath: string) => processFile(filePath, project))
    // )
    // .then((results: MezzuriteComponent[]) => {
    //   components = results.filter((component: MezzuriteComponent) => component != null);
    //   connection.sendNotification('custom/mezzuriteComponents', { value: components });
    // })
    // .catch((error: Error) => connection.console.warn(error.message));
  });

});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
