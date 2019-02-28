/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
  WorkspaceFolder
} from 'vscode-languageserver';
import extractSourceFiles from './filesystem/extractSourceFiles';
import processFiles from './filesystem/processFiles';
import MezzuriteComponent from './models/mezzuriteComponent';
import getComponentType from './getComponentType';
import generateComponent from './generateComponent';

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
const documents: TextDocuments = new TextDocuments();

const components: {
  angularjs: MezzuriteComponent[];
  ngComponent: MezzuriteComponent[];
  ngModule: MezzuriteComponent[];
  react: MezzuriteComponent[];
} = {
  angularjs: [],
  ngComponent: [],
  ngModule: [],
  react: []
};

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
    // TODO: Make this work for multiple folders.
    const files = extractSourceFiles(folders[0].uri);
    processFiles(files, (fileData: string, filePath: string) => {
      const componentType = getComponentType(fileData);
      if (componentType != null) {
        components[componentType].push(generateComponent(componentType, filePath));
      }
    }).then(() => {
      connection.console.log(JSON.stringify(components.ngComponent));
      connection.console.log(JSON.stringify(components.ngModule));
      connection.console.log(JSON.stringify(components.react));
    });
  });
});

connection.onRequest('custom/clientInitialized', () => {
  connection.console.log('got request');
  // connection.sendNotification('custom/mezzuriteComponents', components.angular);
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
