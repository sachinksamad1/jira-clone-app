export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  reporterId: string;
  assigneeId?: string;
}

export interface TasksState {
  tasks : Task[];
  isLoading : boolean;
  error : string | null;
}

//
export interface TaskWithAssignee extends Task {
  assigneeName? : string;
}