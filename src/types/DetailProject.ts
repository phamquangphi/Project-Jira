import { Category } from "./Api";
import { Creator } from "./Create";

export type Detailproject = {
  lstTask: ListTask[];
  members: member[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  projectCategory: Category;
  alias: string;
};
export type ListTask = {
  lstTaskDeTail: ListTaskDeTail[];
  statusId: string;
  statusName: string;
  alias: string;
};
export type ListTaskDeTail = {
  priorityTask: PriorityTask;
  taskTypeDetail: TaskTypeDetail;
  assigness: Assigness[];
  lstComment: ListComment[];
  taskId: number;
  taskName: string;
  alias: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  typeId: number;
  priorityId: number;
  projectId: number;
};
export type PriorityTask = {
  priorityId: number;
  priority: string;
};
export type TaskTypeDetail = {
  id: number;
  taskType: string;
};
export type Assigness = {
  id: number;
  avatar: string;
  name: string;
  alias: string;
};
export type ListComment = {
  id: number;
  idUser: number;
  name: string;
  avatar: string;
  commentContent: string;
};
export type member = {
  userId: number;
  name: string;
  avatar: string;
  email: null;
  phoneNumber: null;
};
