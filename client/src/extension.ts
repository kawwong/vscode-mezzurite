/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { ExtensionContext, window, workspace, Uri } from 'vscode';
import {
	LanguageClient,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient';
import MezzuriteTreeView from './models/MezzuriteTreeView';

import MezzuriteComponent from './models/MezzuriteComponent';

let client: LanguageClient;

export function activate (context: ExtensionContext) {
	// The server is implemented in node
  let serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

	// Create the language client and start the client.
  client = new LanguageClient(
		'vscode-mezzurite',
		'Mezzurite',
		serverOptions,
		undefined
  );

  const treeView = new MezzuriteTreeView([], context.extensionPath);

  window.registerTreeDataProvider('mezzuriteComponentList', treeView);

	// Start the client. This will also launch the server
  client.start();

  client.onReady().then(() => {
    client.onNotification('custom/mezzuriteComponents', (message: { value: MezzuriteComponent[] }) => {
      window.registerTreeDataProvider('mezzuriteComponentList', new MezzuriteTreeView(message.value, context.extensionPath));
    });
  });

  const fileWatcher = workspace.createFileSystemWatcher('**/*.{ts,js,tsx,jsx}', false, false, false);

  fileWatcher.onDidChange((event: Uri) => {
    client.sendNotification('custom/fileChanged', event.fsPath);
  });
}

export function deactivate (): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
