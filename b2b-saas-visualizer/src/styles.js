import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AppContainer = styled.div`
    background-color: #000000;
    min-height: 100vh;
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
  /* Set margins individually */
  margin-top: calc((var(--top-margin) / var(--max-height)) * 100vh);
  margin-bottom: 0;
  margin-left: calc((var(--margin-side) / var(--max-width)) * 100vw);
  margin-right: calc((var(--margin-side) / var(--max-width)) * 100vw);
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  box-sizing: border-box;

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




export const OrganizationsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;

    @media (max-width: 768px){
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
    }

    @media (max-width: 480px){
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 16px; 
    }
`;


export const HeaderTitle = styled.h1`
    font-size: var(--header-font-size, 80px); 
    line-height: 1.2; 
    position: relative;
    z-index: 1; 
    color: #FFFFFF; 
    text-align: center; 

    /* Proportional width, height, and positioning */
    width: calc(777 / 1440 * 100vw);
    height: calc(196 / 900 * 100vh);
    left: calc(46 / 1440 * 100vw);
    top: calc(369 / 900 * 100vh);

    font-family: 'Instrument Sans', sans-serif;

    /* Adjust the font size for diff. screen sizes! */
    @media (max-width: 1200px) {
        font-size: 60px; 
        left: calc(46 / 1200 * 100vw);
        right: calc(369 / 800 * 100vh); 
    }

    @media (max-width: 768px) {
        font-size: 40px;
        left: calc(46 / 768 * 100vw);
        right: calc(369 / 600 * 100vh);
    }

    @media (max-width: 480px) {
        font-size: 30px;
        left: calc(46 / 480 * 100vw);
        top: calc(369 / 400 * 100vh);
    }
`;

export const OrganizationCard = styled(motion.div)`
    background-color: ${({ bgColor }) => bgColor || "#B5651D"}
    border-radius: 20px;
    padding: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease; 

    &: hover {
        transform: scale(1.02);
    }

    @media (max-width: 768px) {
        padding: 15px; 
    }

    @media (max-width: 480px){
        padding: 10px; 
    }
`;

export const ProjectCard = styled(motion.div)`
    background-color: #E9A8A8;
    border-radius: 12px;
    padding: 15px;
    cursor: pointer;
    display: flex;
    flex-direciton: column;
    justify-content: space-between; 
    transition: transform 0.3s ease; 

    @media (max-width: 768px) {
        padding: 10px;
    }

    @media (max-width: 480px) {
        padding: 8px; 
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
