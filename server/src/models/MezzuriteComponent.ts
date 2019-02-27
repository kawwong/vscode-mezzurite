interface MezzuriteComponent {
  checks: {
    [key: string]: boolean;
  };
  filePath: string;
  type: string;
}

export default MezzuriteComponent;
