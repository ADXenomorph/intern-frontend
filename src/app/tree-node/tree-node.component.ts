import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TreeNode } from '../models/tree-node';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent {
  @Input() node: TreeNode;
  @Input() color: string;
  @Input() hasChildren = false;
  @Input() childrenVisible = true;

  @Output() nodeClick = new EventEmitter();

  public clickNode() {
    this.nodeClick.emit();
  }
}
