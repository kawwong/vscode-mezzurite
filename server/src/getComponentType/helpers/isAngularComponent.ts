function isAngularComponent (fileContents: string): boolean {
  let isAngularComponent = false;

  if (fileContents != null) {
    isAngularComponent = fileContents.indexOf('@Component') >= 0;
  }

  return isAngularComponent;
}

export default isAngularComponent;
