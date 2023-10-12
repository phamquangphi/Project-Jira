export type CreateTask = {
  listUserAsign: [];
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
};
export type updateStatus = {
  taskId: number;
  statusId: string;
};
export type updatePriority = {
  taskId: number;
  priorityId: number;
};
export type updateDescription = {
  taskId: number;
  description: string;
};
