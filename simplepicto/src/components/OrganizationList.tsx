import React from 'react';
import { motion } from 'framer-motion';
import { Organization, Project } from '../types';
import ProjectList from './ProjectList';

interface Props {
  organizations: Organization[];
  projects: Project[];
  onSelect: (item: Organization) => void;
}

const OrganizationList: React.FC<Props> = ({ organizations, projects, onSelect }) => {
  return (
    <>
      {organizations.map((org) => (
        <motion.div
          key={org.id}
          className="organization-card"
          whileHover={{ scale: 1.02 }}
          onClick={() => onSelect(org)}
        >
          <h2>{org.name}</h2>
          <p>
            Plan: {org.plan} | Members: {org.members}
          </p>
          <ProjectList 
            projects={projects.filter((p) => p.orgId === org.id)} 
            onSelect={onSelect} 
            tasks={tasks} 
          />
        </motion.div>
      ))}
    </>
  );
};

export default OrganizationList;
