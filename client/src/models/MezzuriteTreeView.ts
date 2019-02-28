import { TreeDataProvider, TreeItem, EventEmitter, Event } from 'vscode';
import MezzuriteComponent from './MezzuriteComponent';
import MezzuriteTreeItem from './MezzuriteTreeItem';

class MezzuriteTreeView implements TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: EventEmitter<TreeItem> = new EventEmitter<TreeItem>();
  readonly onDidChangeTreeData: Event<TreeItem> = this._onDidChangeTreeData.event;

  constructor (private components: MezzuriteComponent[]) {}

  getChildren (element: MezzuriteTreeItem): Thenable<TreeItem[]> {
    if (element == null) {
      return new Promise((resolve) => {
        resolve(this.components.map((component: MezzuriteComponent) => new MezzuriteTreeItem(component)));
      });
    } else {
      return new Promise((resolve) => {
        resolve(element.children);
      });
    }
  }

  getTreeItem (element: MezzuriteTreeItem): TreeItem {
    return element;
  }

  refresh (): void {
    this._onDidChangeTreeData.fire();
  }
}

export default MezzuriteTreeView;
