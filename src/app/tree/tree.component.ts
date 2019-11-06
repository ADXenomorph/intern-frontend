import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TreeNode} from '../models/tree-node';
import {ApiService} from '../api.service';
import {TreeNodeComponent} from '../tree-node/tree-node.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  @ViewChildren('svgLine') private svgLines: QueryList<ElementRef>;
  @ViewChildren(TreeNodeComponent, { read: ElementRef }) private nodes: QueryList<ElementRef>;

  treeNodes: TreeNode[];

  private selectedColors = [];
  private colors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff'];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.loadTree().subscribe(res => {
      this.treeNodes = this.fillNodes(res);
    });
  }

  fillNodes(nodes: TreeNode[]): TreeNode[] {
    nodes.forEach(node => {
      this.api.loadUserById(node.user_id)
        .subscribe(user => {
          node.userName = user.last_name + ' ' + user.first_name;
          this.redrawLines();
        });
    });

    this.setChildrenNodeLevels(new TreeNode(), nodes);

    return nodes;
  }

  setChildrenNodeLevels(node: TreeNode, nodes: TreeNode[]) {
    nodes
      .filter(child => child.parent_task_id === (node.task_id ? node.task_id : null) )
      .forEach(child => {
        child.level = node.level !== undefined ? node.level + 1 : 0;
        this.setChildrenNodeLevels(child, nodes);
      });
  }

  getLevels(): number[] {
    if (!this.treeNodes) {
      return [];
    }

    return this.treeNodes
      .map(node => node.level)
      .filter((v, i, a) => a.indexOf(v) === i);
  }

  getNodesByLevel(level: number): TreeNode[] {
    if (!this.treeNodes) {
      return [];
    }

    return this.treeNodes
      .filter(node => node.level === level)
      .sort(
        (n1, n2) => n1.parent_task_id > n2.parent_task_id
          ? 1
          : n1.parent_task_id < n2.parent_task_id ? -1 : 0
      );
  }

  getLevelColor(level: number): string {
    if (!this.selectedColors[level]) {
      const selectedColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.colors.splice(this.colors.indexOf(selectedColor), 1);
      this.selectedColors[level] = selectedColor;
    }

    return this.selectedColors[level];
  }

  getNodeChildren(node: TreeNode): TreeNode[] {
    return this.treeNodes.filter(child => child.parent_task_id === node.task_id);
  }

  redrawLines() {
    this.svgLines.toArray().forEach(element => {
      const line: HTMLElement = element.nativeElement;
      const parentTaskId = line.dataset.taskId;
      const childTaskId = line.dataset.childId;

      const parentNode = this.nodes.toArray()
        .find(nodeEl => nodeEl.nativeElement.dataset.taskId === parentTaskId);
      const childNode = this.nodes.toArray()
        .find(nodeEl => nodeEl.nativeElement.dataset.taskId === childTaskId);

      const pNe = parentNode.nativeElement;
      const cNe = childNode.nativeElement;

      line.setAttribute('x1', '' + (pNe.offsetLeft + pNe.offsetWidth / 2));
      line.setAttribute('y1', '' + (pNe.offsetTop + pNe.offsetHeight));
      line.setAttribute('x2', '' + (cNe.offsetLeft + cNe.offsetWidth / 2));
      line.setAttribute('y2', '' + (cNe.offsetTop));
    });
  }
}
