import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AppContainer = styled.div`
    background-color: #000000;
    min-height: 100vh;
    max-width: 100vw; 
    padding: 20px; 
`;

export const DashboardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #EA6304;
  width: 100%;
  height: auto;
  min-height: calc((432 / 982) * 100vh); 
  padding: 40px;
  box-sizing: border-box;
  border-radius: 30px;

  margin-top: 90px;

  @media (max-width: 1200px) {
    margin-top: calc(90 / 982 * 100vh);
  }

  @media (max-width: 768px) {
    margin-top: calc(90 / 768 * 100vh);
  }

  @media (max-width: 480px) {
    margin-top: calc(90 / 480 * 100vh);
  }
`;


export const HeaderTitle = styled.h1`
  font-size: 5rem; 
  line-height: 1.2;
  color: #FFFFFF;
  text-align: left;
  margin: 0;
  
  width: 100%;
  max-width: 777px; 
  font-family: 'Instrument Sans', sans-serif;

  margin-top: 369px;

  @media (max-width: 1200px) {
    font-size: 3rem;
    margin-top: calc(369 / 982 * 100vh); 
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: calc(369 / 768 * 100vh);
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-top: calc(369 / 480 * 100vh); 
  }
`;

export const OrganizationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(362.84px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
`;

export const OrganizationCard = styled(motion.div)`
  --x-position: 19;
  --y-position: 612;
  --card-width: 362.84;
  --card-height: 343.04;

  background-color: #853B06;
  border-radius: 30px;
  padding: 20px;
  position: absolute; 
  left: calc((var(--x-position) / 1512) * 100vw); 
  top: calc((var(--y-position) / 982) * 100vh);  
  width: calc((var(--card-width) / 1512) * 100vw);  
  height: calc((var(--card-height) / 982) * 100vh); 
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02); 
  }

  @media (max-width: 1200px) {
    left: calc((var(--x-position) / 1200) * 100vw);  
    top: calc((var(--y-position) / 800) * 100vh);   
    width: calc((300 / 1200) * 100vw);               
    height: calc((300 / 982) * 100vh);             
  }

  @media (max-width: 768px) {
    left: calc((var(--x-position) / 768) * 100vw);
    top: calc((var(--y-position) / 768) * 100vh);
    width: calc((280 / 768) * 100vw);
    height: calc((280 / 768) * 100vh);
  }

  @media (max-width: 480px) {
    left: calc((var(--x-position) / 480) * 100vw);
    top: calc((var(--y-position) / 480) * 100vh);
    width: calc((250 / 480) * 100vw);
    height: calc((250 / 480) * 100vh);
  }
`;

export const TextMembers = styled.div`

`;

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 768px) {
    gap: 8px;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    margin-top: 6px;
  }
`;


export const ProjectCard = styled(motion.div).attrs((props) => ({
  status: props.status,
}))`
  background-color: ${(props) =>
    props.status === 'In Progress' ? '#F9B2B2' : '#D49696'};
  border-radius: 15px;
  padding: 175px;
  cursor: pointer;
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  align-items: flex-start;
  transition: transform 0.3s ease;

  width: 100%;
  max-width: 500px;
  height: auto; 
  margin: 20px; 

  &:hover {
    transform: scale(1.01);
  }

  /* Responsive adjustments */
  @media (max-width: 1200px) {
    max-width: 300px;
    padding: 12px;
  }

  @media (max-width: 768px) {
    max-width: 280px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    max-width: 250px;
    padding: 10px;
  }
`;


export const PopupContainer = styled(motion.div)`
    position: absolute; 
    background-color: #fff;
    border-radius: 12px; 
    padding: 20px; 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    width: 300px;
    max-height: 400px;
    overflow-y: auto; 
`;

export const Overlay = styled(motion.div)`
    position: fixed
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999; 
`;

export const ProjectTitle = styled.h3`
  font-size: 18px;
  color: #FFFFFF;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ProjectStatus = styled.p`
  font-size: 14px;
  color: #FFFFFF;
  margin: 5px 0 0 0;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const TasksList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0 0 0;

  @media (max-width: 768px) {
    margin: 8px 0 0 0;
  }

  @media (max-width: 480px) {
    margin: 6px 0 0 0;
  }
`;

export const TaskItem = styled(motion.li)`
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #000000;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    font-size: 10px;
  }
`;


export const MembersCount = styled.p`
    font-size: 30px;
    font-weight: bold;
    color: #fff; 

    @media (max-width: 768px) {
        font-size: 25px; 
    }

    @media (max-width: 480px){
        font-size: 20px; 
    }
`;

export const OrgTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px){
        font-size: 18px; 
    }
`;

export const OrgSubtitle = styled.p`
    font-size: 16px;

    @media (max-width: 768px){
        font-size: 14px; 
    }

    @media (max-width: 480px) {
        font-size: 12px; 
    }
`;
