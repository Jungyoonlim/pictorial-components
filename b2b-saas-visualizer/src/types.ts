export type Item = Organization | Project | Task;

export interface Organization {
    id: string;
    name: string;
    plan: string;
    members: number;
  }
  
export interface Project {
    id: string;
    name: string;
    orgId: string;
    status: string;
  }
  
export interface Task {
    id: string;
    title: string;
    projectId: string;
    assignedTo: string;
    status: string;
  }
  
export interface AppData {
    organizations: Organization[];
    projects: Project[];
    tasks: Task[];
  }


export type ItemType = 'organization' | 'project' | 'task';
export type SelectedItem = (Organization | Project | Task) & { type: ItemType }; 

