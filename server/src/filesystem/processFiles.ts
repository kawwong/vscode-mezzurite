import { readFile } from 'fs';

function processFiles (filePaths: string[], process: Function): Promise<void[]> {
  return Promise.all(
    filePaths.map((filePath: string) => processFile(filePath, process))
  );
}

function processFile (filePath: string, process: Function): Promise<void> {
  return new Promise((resolve: Function, reject: Function) => {
    readFile(filePath, (error: Error, data: Buffer) => {
      if (error != null) {
        reject(error);
      } else {
        process(data.toString(), filePath);
        resolve();
      }
    });
  });
}

export default processFiles;
