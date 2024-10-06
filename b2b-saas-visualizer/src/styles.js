import { motion } from 'framer-motion';
import styled from 'styled-components';

export const AppContainer = styled.div`
  background-color: #000000;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Instrument Sans', sans-serif;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`

export const DashboardHeader = styled.div`
  background-color: #EA6304;
  border-radius: 30px;
  padding: 40px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 30px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 15px;
  }
`

export const HeaderTitle = styled.h1`
  color: #FFFFFF;
  font-size: 80px;
  font-weight: 400;
  margin: 0 0 20px 0;

  @media (max-width: 1024px) {
    font-size: 60px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`

export const OrganizationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`

export const OrganizationCard = styled(motion.div)`
  background-color: #853B06;
  border-radius: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  height: 250px;

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`

export const OrgTitle = styled.h2`
  font-size: 30px;
  font-weight: 400;
  color: #FFFFFF;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`

export const OrgSubtitle = styled.p`
  font-size: 17px;
  color: #CDCDCD;
  margin: 5px 0 0 0;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`

export const TextMembers = styled.div`
  font-size: 20px;
  color: #B7B3B3;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`

export const MembersCount = styled.p`
  font-size: 75px;
  color: #FFFFFF;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 60px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 15px;
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-top: 10px;
  }
`

export const ProjectCard = styled(motion.div)`
  background-color: #F9B2B2;
  border-radius: 30px;
  padding: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`

export const ProjectTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
  color: #1A1A1A;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`

export const ProjectStatus = styled.p`
  font-size: 60px;
  color: #FFFFFF;
  margin: 10px 0 0 0;

  @media (max-width: 1024px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`

export const PopupContainer = styled(motion.div)`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 280px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 260px;
    padding: 10px;
    max-height: 350px;
  }
`

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`