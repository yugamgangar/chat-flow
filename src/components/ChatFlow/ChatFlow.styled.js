import styled from 'styled-components';

export const Navbar = styled.div`
    height: 50px;
    box-shadow: 0 1px 2px 0 #0000001a;
`;

export const NavbarToolsContainer = styled.div`
    margin-left: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
`;

export const FlowWrapper = styled.div`
    display: flex;
    height: 90vh;
`;

export const FlowContainer = styled.div`
    flex-basis: 80%;
    padding: 20px;
`;

export const Button = styled.button`
    padding: 7px 14px;
    color: #0A66C2;
    border-radius: 7px;
    border: 1px solid #0A66C2;
    background-color: white;
    margin-left: 4px;
    margin-right: 4px;
    cursor: pointer;
`;
