function isAngularModule (fileContents: string): boolean {
  let isAngularModule = false;

  if (fileContents != null) {
    isAngularModule = fileContents.indexOf('@NgModule') >= 0;
  }

  return isAngularModule;
}

export default isAngularModule;
