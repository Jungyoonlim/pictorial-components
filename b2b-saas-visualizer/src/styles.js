import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AppContainer = styled.div`
    background-color: #000000;
    min-height: 100vh;
    max-width: 100vw; 
    padding: 20px; 
`;

export const DashboardHeader = styled.div`
  --max-width: 1512;
  --content-width: 1474;
  --margin-side: 19;
  --max-height: 982;
  --content-height: 432;
  --top-margin: 153;
  --border-radius: 30px;
  
  position: relative;
  width: calc((var(--content-width) / var(--max-width)) * 100vw);
  height: calc((var(--content-height) / var(--max-height)) * 100vh);
  max-height: var(--content-height);
  background: #EA6304;
  border-radius: var(--border-radius);
  display: flex;
  margin-top: calc((var(--top-margin) / var(--max-height)) * 100vh);
  margin-bottom: 0;
  margin-left: calc((var(--margin-side) / var(--max-width)) * 100vw);
  margin-right: calc((var(--margin-side) / var(--max-width)) * 100vw);
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 100%
    padding: 0 20px; 
  }

  @media (max-height: 982px) {
    height: calc((var(--content-height) / var(--max-height)) * 100vh);
    margin-top: calc((var(--top-margin) / var(--max-height)) * 100vh);
  }

  @media (max-width: 768px) {
    width: calc(100vw - 2 * calc((var(--margin-side) / var(--max-width)) * 100vw));
    height: calc((350 / var(--max-height)) * 100vh);
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    height: calc((300 / var(--max-height)) * 100vh);
    margin-top: calc((16 / var(--max-height)) * 100vh);
    padding: 0 12px;
  }
`;

export const HeaderTitle = styled.h1`
    font-size: var(--header-font-size, 80px); 
    line-height: 1.2; 
    position: absolute; 
    z-index: 2; 
    color: #FFFFFF; 
    text-align: left; 

    /* Positioning based on the provided X, Y, W, H values */
    width: calc(777 / 1512 * 100vw); 
    height: calc(196 / 982 * 100vh); 
    left: calc(41 / 1512 * 100vw); 
    top: calc(369 / 982 * 100vh); 

    font-family: 'Instrument Sans', sans-serif;

    @media (max-width: 1200px) {
        font-size: 60px;
        width: calc(777 / 1200 * 100vw);
        left: calc(41 / 1200 * 100vw);
        top: calc(369 / 800 * 100vh);
    }

    @media (max-width: 768px) {
        font-size: 40px;
        width: calc(777 / 768 * 100vw);
        left: calc(41 / 768 * 100vw);
        top: calc(369 / 600 * 100vh);
    }

    @media (max-width: 480px) {
        font-size: 30px;
        width: calc(777 / 480 * 100vw);
        left: calc(41 / 480 * 100vw);
        top: calc(369 / 400 * 100vh);
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
  background-color: #853B06;
  border-radius: 30px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%; 
  max-width: 349px; 
  height: auto; 
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 300px; 
  }

  @media (max-width: 480px) {
    padding: 10px;
    max-width: 260px; 
  }
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
    border-radius: 12px;
    padding: 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease;
  
    &:hover {
      transform: scale(1.01);
    }
  
    @media (max-width: 768px) {
      padding: 12px;
    }
  
    @media (max-width: 480px) {
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
