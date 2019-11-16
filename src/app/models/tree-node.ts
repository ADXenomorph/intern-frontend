/* tslint:disable:variable-name */
export class TreeNode {
  task_id: number;
  name: string;
  assignee_id: number;
  current_progress: number;
  goal: number;
  parent_task_id: number;
  assignee_type: string;
  percent: number;
  userName: string;
  level: number;
  visible = true;
}
