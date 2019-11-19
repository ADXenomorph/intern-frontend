/* tslint:disable:variable-name */
import {User} from './user';

export class Group {
  group_id: number;
  name: string;
  parent_group_id: number;
  users: User[] = [];
}
