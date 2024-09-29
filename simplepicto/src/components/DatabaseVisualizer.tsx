import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Data } from '../types';
import EditableField from './EditableField';

interface DatabaseVisualizerProps {
  selectedItem: any;
  showSchema: boolean;
  setShowSchema: (show: boolean) => void;
  showCheckmark: boolean;
  handleChange: (field: string, value: string) => void;
  data: Data;
}

const DatabaseVisualizer: React.FC<DatabaseVisualizerProps> = ({
  selectedItem,
  showSchema,
  setShowSchema,
  showCheckmark,
  handleChange,
  data,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);

  return (
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
            {Object.entries(selectedItem).map(
              ([key, value]) =>
                key !== 'type' && (
                  <EditableField
                    key={key}
                    keyName={key}
                    value={value}
                    editingField={editingField}
                    setEditingField={setEditingField}
                    handleChange={handleChange}
                  />
                )
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
            {(['organizations', 'projects', 'tasks'] as Array<keyof Data>).map((table) => (
              <div key={table} className="mb-4">
                <h4 className="font-semibold">
                  {table.charAt(0).toUpperCase() + table.slice(1)}
                </h4>
                <ul className="list-disc list-inside">
                  {Object.keys(data[table][0]).map((column) => (
                    <li key={column} className="text-sm">
                      {column}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatabaseVisualizer;
