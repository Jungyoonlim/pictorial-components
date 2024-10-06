import React, { useState } from 'react';
import { useAppContext } from './context';
import { motion, AnimatePresence } from 'framer-motion';
import { Item, SelectedItem, AppData, ItemType } from './types';
import { initialData } from './data';
import './fonts.css';
import { 
  AppContainer,
  DashboardHeader,
  OrganizationsGrid,
  HeaderTitle,
  OrganizationCard,
  ProjectsContainer,
  ProjectCard,
  ProjectTitle,
  ProjectStatus, 
  PopupContainer,
  TextMembers, 
  Overlay,
  MembersCount,
  OrgTitle,
  OrgSubtitle
} from './styles'; 

const B2BSaasDbVisualizer: React.FC = () => {
  const [data, setData] = useState<AppData>(initialData);
  const context = useAppContext();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { selectedItem, setSelectedItem } = context;

  const handleChange = (field: string, value: string) => {
    if (!selectedItem) return;

    setData((prevData) => {
      const newData = { ...prevData };
      const itemType = selectedItem.type + 's' as keyof AppData;
      const index = newData[itemType].findIndex((item) => item.id === selectedItem.id);
      if (index !== -1) {
        newData[itemType][index] = {
          ...newData[itemType][index],
          [field]: value,
        };
      }
      return newData;
    });
    
    setSelectedItem((prevItem: SelectedItem | null) => {
      if (!prevItem) return null;

      const updatedItem: SelectedItem = {
        ...prevItem,
        [field]: value,
        type: prevItem.type, 
      };
      return updatedItem; 
    });

    setShowCheckmark(true);
    setTimeout(() => setShowCheckmark(false), 2000);
  };


  // renders editable field on the popup, allows you to fix the field 
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

  // handleClick to handle the click and display the popup at the click position
  const handleClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    item: Item,
    type: ItemType
  ) => {
    const { clientX, clientY } = event;
    setPopupPosition({ x: clientX, y: clientY });
    setSelectedItem({ ...item, type });
    setShowPopup(true); 
  };
  

  // closePopup closes the popup by updating the ShowPopup state variable
  const closePopup = () => {
    setShowPopup(false);
  }

  return (
    <AppContainer>
    <DashboardHeader>
      <HeaderTitle>
        Project Management Dashboard
      </HeaderTitle>

    // Organizations here, Apple and Figma for here 
    <div style={{ display: 'flex' }}>
      <OrganizationsGrid>
        {data.organizations.map(org => (
          <OrganizationCard
            key={org.id}
            onClick={(e) => handleClick(e, org, 'organization')}
          >
            <OrgTitle>{org.name}</OrgTitle>
            <OrgSubtitle>{org.plan} Plan</OrgSubtitle>
            <TextMembers>Members</TextMembers>
            <MembersCount>{org.members}</MembersCount>
          </OrganizationCard>
        ))}
      </OrganizationsGrid>

      <ProjectsContainer>
        {data.projects.map(project => (
          <ProjectCard
            key={project.id}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e, project, 'project');
            }}
          >
            <ProjectTitle>{project.name}</ProjectTitle>
            <ProjectStatus>{project.status}</ProjectStatus>
          </ProjectCard>
        ))}
      </ProjectsContainer>
    </div>
  </DashboardHeader>

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
          style={{ position: 'absolute', left: popupPosition.x, top: popupPosition.y }}
        >
          {selectedItem && (
            <>
              <h3>{selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)} Details</h3>
              <div>
                {Object.entries(selectedItem).map(([key, value]) =>
                  key !== 'type' && renderEditableField(key, value) // Render editable fields except 'type'
                )}
              </div>
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
            </>
          )}
        </PopupContainer>
      </>
    )}
  </AnimatePresence>
</AppContainer>
  );
};

export default B2BSaasDbVisualizer;