import React from 'react';
import { motion } from 'framer-motion';
import { Project, Task } from '../types';
import TaskList from './TaskList';

interface ProjectListProps {
  projects: Project[];
  tasks: Task[];
  onSelect: (item: any, type: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, tasks, onSelect }) => {
  return (
    <>
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="mt-4 bg-gray-50 rounded p-3"
          whileHover={{ scale: 1.01 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project, 'project');
          }}
        >
          <h3 className="font-semibold">{project.name}</h3>
          <p className="text-sm">Status: {project.status}</p>

          <TaskList
            tasks={tasks.filter((task) => task.projectId === project.id)}
            onSelect={onSelect}
          />
        </motion.div>
      ))}
    </>
  );
};

export default ProjectList;
