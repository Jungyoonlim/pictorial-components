import { useState } from 'react';
import { Data } from '../types';

const initialData: Data = {
  organizations: [
    { id: 'org1', name: 'Acme Corp', plan: 'Enterprise', members: 50 },
    { id: 'org2', name: 'TechStart', plan: 'Pro', members: 20 },
  ],
  projects: [
    { id: 'proj1', name: 'Website Redesign', orgId: 'org1', status: 'In Progress' },
    { id: 'proj2', name: 'Mobile App', orgId: 'org2', status: 'Planning' },
  ],
  tasks: [
    { id: 'task1', title: 'Design Homepage', projectId: 'proj1', assignedTo: 'John Doe', status: 'In Progress' },
    { id: 'task2', title: 'Implement Login', projectId: 'proj2', assignedTo: 'Jane Smith', status: 'To Do' },
  ],
};

export const useData = () => {
  const [data, setData] = useState<Data>(initialData);
  return { data, setData };
};