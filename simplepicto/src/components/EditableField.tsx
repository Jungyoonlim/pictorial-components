import React from 'react';

interface EditableFieldProps {
  keyName: string;
  value: any;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
  handleChange: (field: string, value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  keyName,
  value,
  editingField,
  setEditingField,
  handleChange,
}) => {
  return (
    <div className="mb-2">
      <span className="font-semibold">{keyName}: </span>
      {editingField === keyName ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(keyName, e.target.value)}
          onBlur={() => setEditingField(null)}
          autoFocus
          className="bg-gray-700 border-b border-blue-500 focus:outline-none"
        />
      ) : (
        <span
          onClick={() => setEditingField(keyName)}
          className="cursor-pointer hover:bg-gray-600 px-1 rounded"
        >
          {value}
        </span>
      )}
    </div>
  );
};

export default EditableField;
