function isAngular (fileContents: string): boolean {
  let isAngular = false;
  if (fileContents != null) {
    const hasComponentDecorator = fileContents.indexOf('@Component') >= 0;
    const hasModuleDecorator = fileContents.indexOf('@Module') >= 0;

    isAngular = hasComponentDecorator || hasModuleDecorator;
  }

  return isAngular;
}

export default isAngular;
