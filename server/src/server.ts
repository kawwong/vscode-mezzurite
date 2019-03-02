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

// connection.onDidChangeConfiguration(change => false);

// Only keep settings for open documents
// documents.onDidClose(e => false);

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
// documents.onDidChangeContent(change => false);

// connection.onDidChangeWatchedFiles(_change => false);

// This handler provides the initial list of the completion items.
// connection.onCompletion();

// This handler resolves additional information for the item selected in
// the completion list.
// connection.onCompletionResolve();

/*
connection.onDidOpenTextDocument((params) => {
	// A text document got opened in VSCode.
	// params.uri uniquely identifies the document. For documents store on disk this is a file URI.
	// params.text the initial full content of the document.
	connection.console.log(`${params.textDocument.uri} opened.`);
});
connection.onDidChangeTextDocument((params) => {
	// The content of a text document did change in VSCode.
	// params.uri uniquely identifies the document.
	// params.contentChanges describe the content changes to the document.
	connection.console.log(`${params.textDocument.uri} changed: ${JSON.stringify(params.contentChanges)}`);
});
connection.onDidCloseTextDocument((params) => {
	// A text document got closed in VSCode.
	// params.uri uniquely identifies the document.
	connection.console.log(`${params.textDocument.uri} closed.`);
});
*/

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
