import { TreeDataProvider, TreeItem, EventEmitter, Event, TreeItemCollapsibleState } from 'vscode';
import MezzuriteComponent from './MezzuriteComponent';
import MezzuriteTreeItem from './MezzuriteTreeItem';

class MezzuriteTreeView implements TreeDataProvider<MezzuriteTreeItem> {
  private _onDidChangeTreeData: EventEmitter<MezzuriteTreeItem> = new EventEmitter<MezzuriteTreeItem>();
  readonly onDidChangeTreeData: Event<MezzuriteTreeItem> = this._onDidChangeTreeData.event;

  constructor (private components: MezzuriteComponent[]) {}

  getChildren (): Thenable<MezzuriteTreeItem[]> {
    return new Promise((resolve) => {
      resolve(this.components.map((component: MezzuriteComponent) => new MezzuriteTreeItem(component)));
    });
  }

  getTreeItem (element: TreeItem): TreeItem {
    return element;
  }

  refresh (): void {
    this._onDidChangeTreeData.fire();
  }
}

export default MezzuriteTreeView;
