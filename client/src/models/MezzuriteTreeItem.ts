import { TreeItem, TreeItemCollapsibleState } from 'vscode';
import MezzuriteComponent from './MezzuriteComponent';

class MezzuriteTreeItem extends TreeItem {
  public label: string;

  constructor (
    private component: MezzuriteComponent
  ) {
    super(component.filePath, TreeItemCollapsibleState.Collapsed);
    this.label = component.filePath;
  }

  get description (): string {
    return this.component.filePath;
  }

  get tooltip (): string {
    return this.component.filePath;
  }

  contextValue = 'dependency';
}

export default MezzuriteTreeItem;
