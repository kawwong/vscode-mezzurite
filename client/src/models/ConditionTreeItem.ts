import { TreeItem, TreeItemCollapsibleState } from 'vscode';

class ConditionTreeItem extends TreeItem {
  constructor (
    public isMet: boolean,
    public label: string
  ) {
    super(label, TreeItemCollapsibleState.None);
  }

  get description (): string {
    return this.isMet ? '' : 'Not met.';
  }

  get tooltip (): string {
    return this.label;
  }
}

export default ConditionTreeItem;
