import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onSelect: (item: Task, type: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onSelect }) => {
  return (
    <ul className="mt-2">
      {tasks.map((task) => (
        <motion.li
          key={task.id}
          className="bg-white rounded p-2 mb-2 text-sm"
          whileHover={{ scale: 1.01 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(task, 'task');
          }}
        >
          {task.title} - {task.status}
        </motion.li>
      ))}
    </ul>
  );
};

export default TaskList;
