/* tslint:disable:variable-name */
import {User} from './user';
import {Group} from './group';

export class PopulatedGroupResponse {
  group: Group;
  users: User[];
}
