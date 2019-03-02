import { Node, SyntaxKind, SourceFile } from 'ts-morph';

import MezzuriteComponent from '../../models/mezzuriteComponent';

function generateReact (filePath: string, sourceFile: SourceFile): MezzuriteComponent {
  let component = null;

  if (filePath != null && sourceFile != null) {
    const exportContents = getExportContents(sourceFile);

    if (exportContents != null) {
      let hasWithMezzurite = false;
      let name = null;

      if (exportContents.getKind() === SyntaxKind.Identifier) {
        name = exportContents.getText();
      } else {
        const withMezzuriteNode = exportContents.getFirstChildByKind(SyntaxKind.Identifier);

        if (withMezzuriteNode != null) {
          hasWithMezzurite = true;
          name = withMezzuriteNode.getNextSiblings().find((sibling: Node) => {
            return sibling.getKind() === SyntaxKind.SyntaxList;
          }).getText();
        } else {
          const wrappedNode = exportContents.getLastChildByKind(SyntaxKind.SyntaxList);

          name = wrappedNode.getText();
        }
      }

      component = {
        checks: {
          hasWithMezzurite
        },
        filePath,
        name,
        type: 'react'
      };
    }
  }

  return component;
}

function getExportContents (sourceFile: SourceFile): Node {
  let exportContents = null;
  const fileContents = sourceFile.getChildSyntaxList();

  if (fileContents != null) {
    const exportAssignment = fileContents.getFirstChildByKind(SyntaxKind.ExportAssignment);

    if (exportAssignment != null) {
      exportContents = exportAssignment.getChildren().find((child: Node) => {
        return child.getKind() === SyntaxKind.CallExpression || child.getKind() === SyntaxKind.Identifier;
      });
    }
  }

  return exportContents;
}

export default generateReact;
