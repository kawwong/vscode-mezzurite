import { TreeItem, TreeItemCollapsibleState } from 'vscode';
import { join } from 'path';

class ConditionTreeItem extends TreeItem {
  constructor (
    public isMet: boolean,
    public label: string,
    public rootPath: string
  ) {
    super(label, TreeItemCollapsibleState.None);
  }

  get description (): string {
    return this.isMet ? '' : 'Not met';
  }

  get tooltip (): string {
    return this.label;
  }

  get iconPath (): string {
    return join(this.rootPath, 'client', 'res', 'icons', `${this.isMet ? 'tracked' : 'notTracked'}.svg`);
  }
}

export default ConditionTreeItem;
