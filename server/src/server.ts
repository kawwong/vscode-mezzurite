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
import combineWorkspaceFolders from './utilities/combineWorkspaceFolders';
import processFile from './filesystem/processFile';

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
      files.map((filePath: string) => processFile(filePath, project))
    )
    .then((results: MezzuriteComponent[]) => {
      components = results.filter((component: MezzuriteComponent) => component != null);
      connection.sendNotification('custom/mezzuriteComponents', { value: components });
    });
  });
});

connection.onNotification('custom/fileChanged', (filePath: string) => {
  processFile(filePath, project).then((changedComponent: MezzuriteComponent) => {
    if (changedComponent != null) {
      components = components.map((component: MezzuriteComponent) => {
        if (join(changedComponent.filePath) === join(component.filePath)) {
          return changedComponent;
        } else {
          return component;
        }
      });

      connection.sendNotification('custom/mezzuriteComponents', { value: components });
    }
  });
});

connection.onNotification('custom/fileDeleted', (filePath: string) => {
  components = components.filter((component: MezzuriteComponent) => {
    return join(component.filePath) !== join(filePath);
  });

  connection.sendNotification('custom/mezzuriteComponents', { value: components });
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
