import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppData, Organization, Project, Task, SelectedItem, ItemType } from './types';
import { initialData } from './data';

const B2BSaasDbVisualizer: React.FC = () => {
  const [data, setData] = useState<AppData>(initialData);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [showSchema, setShowSchema] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [backendCode, setBackendCode] = useState<string>('');

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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Simulated Frontend */}
      <div className="w-2/3 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Project Management Dashboard</h1>
        
        {data.organizations.map(org => (
          <motion.div
            key={org.id}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
            whileHover={{ scale: 1.02 }}
            onClick={() => handleSelect(org, 'organization')}
          >
            <h2 className="text-xl font-semibold">{org.name}</h2>
            <p>Plan: {org.plan} | Members: {org.members}</p>
            
            {data.projects.filter(proj => proj.orgId === org.id).map(project => (
              <motion.div
                key={project.id}
                className="mt-4 bg-gray-50 rounded p-3"
                whileHover={{ scale: 1.01 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(project, 'project');
                }}
              >
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm">Status: {project.status}</p>
                
                <ul className="mt-2">
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
      
      {/* Database Visualizer */}
      <div className="w-1/3 bg-gray-800 text-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Database Visualizer</h2>
        <button
          className="mb-4 bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setShowSchema(!showSchema)}
        >
          {showSchema ? 'Hide Schema' : 'Show Schema'}
        </button>
        
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-700 rounded-lg p-4 mb-4"
            >
              <h3 className="text-lg font-semibold mb-2">
                {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)} Details
              </h3>
              {Object.entries(selectedItem).map(([key, value]) => 
                key !== 'type' && renderEditableField(key, value)
              )}
              <AnimatePresence>
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
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showSchema && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-700 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold mb-2">Database Schema</h3>
              {(Object.keys(data) as Array<keyof AppData>).map(table => (
                <div key={table} className="mb-4">
                  <h4 className="font-semibold">{table.charAt(0).toUpperCase() + table.slice(1)}</h4>
                  <ul className="list-disc list-inside">
                    {Object.keys(data[table][0]).map(column => (
                      <li key={column} className="text-sm">{column}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {backendCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-700 rounded-lg p-4 mt-4"
          >
            <h3 className="text-lg font-semibold mb-2">Generated Backend Code</h3>
            <pre className="text-xs overflow-x-auto">{backendCode}</pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default B2BSaasDbVisualizer;