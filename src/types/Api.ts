export type Category = { id: number; projectCategoryName: string };
export type TaskType = {
  id: number;
  taskType: string;
};
export type Priority = {
  priorityId: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
};
export type Status = {
  statusId: string;
  statusName: string;
  alias: string;
  deleted: string;
};
