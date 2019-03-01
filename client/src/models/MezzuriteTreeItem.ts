import { TreeItem, TreeItemCollapsibleState } from 'vscode';
import MezzuriteComponent from './MezzuriteComponent';
import ConditionTreeItem from './ConditionTreeItem';
import { join } from 'path';

class MezzuriteTreeItem extends TreeItem {
  public label: string;
  private fulfilled: boolean;

  constructor (
    private component: MezzuriteComponent,
    private rootPath: string
  ) {
    super(component.filePath, TreeItemCollapsibleState.Collapsed);
    this.label = component.name;
    this.fulfilled = Object.keys(this.component.checks)
    .map((key: string) => this.component.checks[key])
    .reduce((previousValue: boolean, currentValue: boolean) => {
      return previousValue && currentValue;
    });
  }

  get description (): string {
    return this.fulfilled ? 'Tracked' : 'Not tracked';
  }

  get tooltip (): string {
    return this.component.filePath;
  }

  get children (): TreeItem[] {
    return Object.keys(this.component.checks)
    .map((check) => {
      return new ConditionTreeItem(this.component.checks[check], check, this.rootPath);
    });
  }

  get iconPath (): string {
    const iconKind = this.fulfilled ? '' : 'Light';
    return join(this.rootPath, 'client', 'res', 'icons', `${this.component.type + iconKind}.svg`);
  }

}

export default MezzuriteTreeItem;
