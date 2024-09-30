import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DashboardHeader = styled.div`
    position: relative;
    width: var(--header-width, 80vw);
    height: var(--header-height, 200px);
    background: #EA6304;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    @media (max-width: 1200px){
        --header-width: 90vw; 
        --header-height: 180px; 
    }

    @media (max-width: 768px){
        --header-width: 95vw;
        --header-height: 150px; 
    }

    @media (max-width: 480px){
        --header-width: 100vw;
        --header-height: 120px; 
    }
`;

export const OrganizationsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;

`


export const HeaderTitle = styled.div`
    font-size: var(--header-font-size, 80px); 
    position: absolute;
    width: 777px;
    height: 196px; 
    left: 46px; 
    top: 369px; 
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 400;
    font-size: 80px;
    line-height: 98px;
    color: #FFFFFF; 
`;

