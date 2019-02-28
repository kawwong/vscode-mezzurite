function isAngularModule (fileContents: string): boolean {
  let isAngularModule = false;

  if (fileContents != null) {
    isAngularModule = fileContents.indexOf('@Module') >= 0;
  }

  return isAngularModule;
}

export default isAngularModule;
