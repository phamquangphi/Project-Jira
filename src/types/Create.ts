export type AllProjcet = {
  members: Members;
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  alias: string;
  deleted: boolean;
};
export type Members = {
  userId: number;
  name: string;
  avatar: string;
};
export type Creator = {
  id: number;
  name: string;
};
export type EditProject = {
  id: number;
  projectName: string;
  creator: any;
  description: string;
  categoryId: string;
};
export type AssignProject = {
  projectId: number;
  userId: number;
};
