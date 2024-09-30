import React, { useState } from 'react';
import styled from 'styled-components'; 
import { motion, AnimatePresence } from 'framer-motion';
import { AppData, Organization, Project, Task, SelectedItem, ItemType } from './types';
import { initialData } from './data';
import './fonts.css';
import { 
  DashboardHeader,
  OrganizationsGrid,
  HeaderTitle,
  OrganizationCard,
  ProjectCard,
  PopupContainer,
  Overlay,
  MembersCount,
  OrgTitle,
  OrgSubtitle
} from './styles'; 

const B2BSaasDbVisualizer: React.FC = () => {
  const [data, setData] = useState<AppData>(initialData);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [showSchema, setShowSchema] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [backendCode, setBackendCode] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleSelect = (item: Organization | Project | Task, type: ItemType) => {
    setSelectedItem({ ...item, type });
    setEditingField(null);
  };

  const handleChange = (field: string, value: string) => {
    if (!selectedItem) return;

    setData(prevData => {
      const newData = { ...prevData };
      const itemType = selectedItem.type + 's' as keyof AppData;
      const index = newData[itemType].findIndex(item => item.id === selectedItem.id);
      if (index !== -1) {
        newData[itemType][index] = { ...newData[itemType][index], [field]: value };
      }
      return newData;
    });
    setSelectedItem(prevItem => prevItem ? { ...prevItem, [field]: value } : null);
    setShowCheckmark(true);
    setTimeout(() => setShowCheckmark(false), 2000);
    const backendCodeUpdate = generateBackendCode(selectedItem.type, selectedItem.id, field, value);
    setBackendCode(backendCodeUpdate);
  };

  const generateBackendCode = (type: ItemType, id: string, field: string, value: string): string => {
    return `
        // Update ${type} in database
        db.${type}s.update(
        { id: "${id}" },
        { $set: { ${field}: "${value}" } }
        );

        // Update corresponding API endpoint
        app.put('/api/${type}s/:id', (req, res) => {
        const { id } = req.params;
        const { ${field} } = req.body;
        
        db.${type}s.update({ id }, { $set: { ${field} } }, (err, result) => {
            if (err) {
            res.status(500).send(err);
            } else {
            res.status(200).send(result);
            }
        });
        });
    `;
  };

  const renderEditableField = (key: string, value: any) => (
    <div key={key} className="mb-2">
      <span className="font-semibold">{key}: </span>
      {editingField === key ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(key, e.target.value)}
          onBlur={() => setEditingField(null)}
          autoFocus
          className="bg-gray-700 border-b border-blue-500 focus:outline-none px-1"
        />
      ) : (
        <span
          onClick={() => setEditingField(key)}
          className="cursor-pointer hover:bg-gray-600 px-1 rounded"
        >
          {value}
        </span>
      )}
    </div>
  );

  // handlePopup sets the selected item and opens the popup by updating the ShowPopup state variable
  const handlePopup = (item: Organization | Project | Task, type: ItemType) => {
    setSelectedItem({ ...item, type });
    setShowPopup(true);
  }

  // closePopup closes the popup by updating the ShowPopup state variable
  const closePopup = () => {
    setShowPopup(false);
  }

  return (
  <div style={styles.container}>
  <div style={styles.dashboard}>
    <HeaderTitle>
        Project Management Dashboard
    </HeaderTitle>
    
    {/* Grid for Organizations and Projects */}
    <div style={styles.organizationsGrid}>
      {data.organizations.map(org => (
        <motion.div
          key={org.id}
          style={styles.organizationsCard}
          whileHover={{ scale: 1.02 }}
          onClick={() => handleSelect(org, 'organization')}
        >
          <h2 style={styles.organizationTitle}>{org.name}</h2>
          <p style={styles.organizationSubtitle}>Plan: {org.plan}</p>
          <p style={styles.membersCount}>Members: {org.members}</p>
          
          {data.projects.filter(proj => proj.orgId === org.id).map(project => (
            <motion.div
              key={project.id}
              style={styles.projectCard}
              whileHover={{ scale: 1.01 }}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(project, 'project');
              }}
            >
              <h3>{project.name}</h3>
              <p style={styles.projectStatus}>Status: {project.status}</p>
              
              <ul>
                {data.tasks.filter(task => task.projectId === project.id).map(task => (
                  <motion.li
                    key={task.id}
                    className="bg-white rounded p-2 mb-2 text-sm"
                    whileHover={{ scale: 1.01 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(task, 'task');
                    }}
                  >
                    {task.title} - {task.status}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  </div>

  {/* Database Visualizer */}
  <div className="w-1/3 bg-gray-800 text-white p-6 overflow-y-auto">
    <h2 className="text-2xl font-bold mb-4">Database Visualizer</h2>
    <button
      className="mb-4 bg-blue-500 text-white px-3 py-1 rounded"
      onClick={() => setShowSchema(!showSchema)}
    >
      {showSchema ? 'Hide Schema' : 'Show Schema'}
    </button>

    {/* Selected Item */}
    {/* Popup for Database Visualizer */}
    <AnimatePresence>
      {showPopup && (
        <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
            />
            <PopupContainer
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <h3>{selectedItem?.type.charAt(0).toUpperCase() + selectedItem?.type.slice(1)} Details</h3>
              {selectedItem && (
                <div>
                  {Object.entries(selectedItem).map(([key, value]) =>
                    key !== 'type' && renderEditableField(key, value) // Render editable fields except 'type'
                  )}
                </div>
              )}
              {showCheckmark && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="text-green-500 font-bold mt-2"
                >
                  ✓ Changes saved
                </motion.div>
              )}
              <button onClick={closePopup}>Close</button>
            </PopupContainer>
          </>
        )}
      </AnimatePresence>
    </div>
  </div>

  );
}

export default B2BSaasDbVisualizer;