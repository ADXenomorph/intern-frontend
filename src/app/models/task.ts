/* tslint:disable:variable-name */
export class Task {
  task_id: number = null;
  name: string;
  assignee_id: number;
  assignee_type: string;
  goal: number;
  parent_task_id: number = null;
}
