import { TreeItem, TreeItemCollapsibleState } from 'vscode';
import MezzuriteComponent from './MezzuriteComponent';
import ConditionTreeItem from './ConditionTreeItem';

class MezzuriteTreeItem extends TreeItem {
  public label: string;

  constructor (
    private component: MezzuriteComponent
  ) {
    super(component.filePath, TreeItemCollapsibleState.Collapsed);
    this.label = component.name;
  }

  get description (): string {
    return this.component.filePath;
  }

  get tooltip (): string {
    return this.component.filePath;
  }

  get children (): TreeItem[] {
    return Object.keys(this.component.checks)
    .map((check) => {
      return new ConditionTreeItem(this.component.checks[check], check);
    });
  }
}

export default MezzuriteTreeItem;
