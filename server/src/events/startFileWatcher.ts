// const chokidar = require('chokidar');
// import { join } from 'path';
// import Project from 'ts-morph';

// import normalizeWorkspacePath from '../utilities/normalizeWorkspacePath';
// import debounce from '../utilities/debounce';
// import processFile from '../utilities/processFile';
// import MezzuriteComponent from '../models/MezzuriteComponent';

// function startFileWatcher (path: string, project: Project): void {
//   const folderPath = normalizeWorkspacePath(path);
//   let events = [];
//   chokidar
//     .watch(join(folderPath), {
//       awaitWriteFinish: true,
//       ignored: /node_modules/
//     })
//     .on('all', (event, path) => {
//       if (event === 'add' || event === 'unlink' || event === 'change') {
//         if (String(path).endsWith('.js')) {
//           events.push({
//             event,
//             path
//           });
//         }
//       }
//       onAdd();
//     });

//   const onAdd = debounce(() => {
//     Promise.all(
//       events.map(event => processFile(event.path, project))
//     )
//     .then((results: MezzuriteComponent[]) => {
//       components = results.filter((component: MezzuriteComponent) => component != null);
//     })
//     .catch((error: Error) => connection.console.warn(error.message));
//     events = [];
//   }, 250, false);
//   // const files = combineWorkspaceFolders(folders);
//   // Promise.all(
//   //   files.map((filePath: string) => processFile(filePath, project))
//   // )
//   // .then((results: MezzuriteComponent[]) => {
//   //   components = results.filter((component: MezzuriteComponent) => component != null);
//   //   connection.sendNotification('custom/mezzuriteComponents', { value: components });
//   // })
//   // .catch((error: Error) => connection.console.warn(error.message));
// }

// export default startFileWatcher;
