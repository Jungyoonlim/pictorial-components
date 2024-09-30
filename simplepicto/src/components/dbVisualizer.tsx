import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import OrganizationList from './OrganizationList';
import DatabaseVisualizer from './DatabaseVisualizer';
import { Organization, Project, Task } from '../types';

const B2BSaasDbVisualizer: React.FC = () => {
  const { data, setData } = useData();
  const [selectedItem, setSelectedItem] = useState<Organization | Project | Task | null>(null);

  const handleSelect = (item: Organization | Project | Task) => {
    setSelectedItem(item);
  };

  return (
    <div className="app-container">
      {/* Simulated Frontend */}
      <div className="main-content">
        <h1>Project Management Dashboard</h1>
        <OrganizationList
          organizations={data.organizations}
          projects={data.projects}
          onSelect={handleSelect}
        />
      </div>

      {/* Database Visualizer */}
      <DatabaseVisualizer 
        selectedItem={selectedItem} 
        showSchema={showSchema} 
        setShowSchema={setShowSchema} 
        showCheckmark={showCheckmark} 
        handleChange={handleChange} 
        data={data} 
      />
    </div>
  );
};

export default B2BSaasDbVisualizer;
