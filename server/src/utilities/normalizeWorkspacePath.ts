function normalizeWorkspacePath (path: string): string {
  let normalized = path;

  const colonIndex = normalized.lastIndexOf(':');
  if (colonIndex > -1) {
    normalized = normalized.substring(colonIndex + 1);
  }

  const escapedColonIndex = normalized.lastIndexOf('%3A');

  if (escapedColonIndex > -1) {
    normalized = normalized.substring(escapedColonIndex + 3);
  }

  return normalized;
}

export default normalizeWorkspacePath;
