// import FileEvent from '../models/FileEvent';
// import MezzuriteComponent from '../models/MezzuriteComponent';
// import onFileChanged from './onFileChanged';

// function onFileWatcherEvent (components: MezzuriteComponent[], events: FileEvent[]): Promise<MezzuriteComponent[]> {
//   let addChangeEvents: FileEvent[] = [];
//   let unlinkEvents: FileEvent[] = [];
//   let updatedComponents: MezzuriteComponent = [];
//   if (events != null && events.length > 0) {
//     events.forEach((event: FileEvent) => {
//       if (event.event === 'unlink') {
//         unlinkEvents = [ ...unlinkEvents, event ];
//       } else if (event.event === 'add' || event.event === 'change') {
//         addChangeEvents = [ ...addChangeEvents, event ];
//       }
//     });

//     onFileChanged(components, )
//   }
// }

// export default onFileWatcherEvent;
