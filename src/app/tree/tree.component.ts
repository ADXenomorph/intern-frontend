import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TreeNode} from '../models/tree-node';
import {ApiService} from '../api.service';
import {TreeNodeComponent} from '../tree-node/tree-node.component';
import {Task} from '../models/task';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  @ViewChildren('svg') private svg: QueryList<ElementRef>;
  @ViewChildren(TreeNodeComponent, { read: ElementRef }) private nodes: QueryList<ElementRef>;

  treeNodes: TreeNode[];

  private selectedColors = [];
  private colors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff'];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadTree();
  }

  loadTree() {
    this.api.loadTree().subscribe(nodes => {
      nodes.forEach(node => {
        node.visible = true;
      });

      setTimeout(() => this.redrawLines(), 5);
      this.setChildrenNodeLevels(new TreeNode(), nodes);

      this.treeNodes = nodes;
    });
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
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((l1, l2) => l1 - l2)
    ;
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
    this.svg.toArray().forEach(element => {
      const svg: HTMLElement = element.nativeElement;
      const line: HTMLElement = svg.childNodes[0] as any;
      const parentTaskId = line.dataset.taskId;
      const childTaskId = line.dataset.childId;

      const childTreeNode = this.treeNodes.find(n => n.task_id === parseInt(childTaskId, 10));
      if (!childTreeNode.visible) {
        this.resetSvgAndLine(svg, line);
        return;
      }

      const parentNode = this.nodes.toArray()
        .find(nodeEl => nodeEl.nativeElement.dataset.taskId === parentTaskId);
      const childNode = this.nodes.toArray()
        .find(nodeEl => nodeEl.nativeElement.dataset.taskId === childTaskId);

      const pNe = parentNode.nativeElement;
      const cNe = childNode.nativeElement;

      const svgLeft = Math.min(pNe.offsetLeft + pNe.offsetWidth / 2, cNe.offsetLeft + cNe.offsetWidth / 2);
      const svgTop = pNe.offsetTop + pNe.offsetHeight;
      const svgWidth = Math.max(pNe.offsetLeft + pNe.offsetWidth / 2, cNe.offsetLeft + cNe.offsetWidth / 2) - svgLeft + 4;
      const svgHeight = cNe.offsetTop - svgTop;

      svg.style.left = '' + svgLeft;
      svg.style.top = '' + svgTop;
      svg.style.width = '' + svgWidth;
      svg.style.height = '' + svgHeight;

      line.setAttribute('x1', '' + (pNe.offsetLeft <= cNe.offsetLeft ? 2 : svgWidth - 2));
      line.setAttribute('y1', '0');
      line.setAttribute('x2', '' + (pNe.offsetLeft > cNe.offsetLeft ? 2 : svgWidth - 2));
      line.setAttribute('y2', '' + svgHeight);
    });
  }

  private resetSvgAndLine(svg, line) {
    svg.style.left = '0';
    svg.style.top = '0';
    svg.style.width = '0';
    svg.style.height = '0';

    line.setAttribute('x1', '0');
    line.setAttribute('y1', '0');
    line.setAttribute('x2', '0');
    line.setAttribute('y2', '0');
  }

  drop(event) {
    const treeNode: TreeNode = event.container.data;
    const isUser = !!event.item.data.user_id;
    const task: Task = {
      goal: treeNode.goal,
      name: treeNode.name,
      task_id: treeNode.task_id,
      parent_task_id: treeNode.parent_task_id,
      assignee_id: isUser ? event.item.data.user_id : event.item.data.group_id,
      assignee_type: 'group'
    };
    // todo update assignee by task id
    this.api.upsertTask(task).subscribe(() => this.loadTree());
  }

  isVisible(node: TreeNode) {
    const parent = this.treeNodes.find(n => n.task_id === node.parent_task_id);
    return node.visible && (!parent || this.isVisible(parent));
  }

  toggleVisibility(node: TreeNode) {
    this.treeNodes.filter(n => n.parent_task_id === node.task_id).forEach(n => n.visible = !n.visible);
    setTimeout(() => this.redrawLines(), 5);
  }
}
