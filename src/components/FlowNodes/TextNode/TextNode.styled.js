import styled from 'styled-components';

export const NodeWrapper = styled.div`
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    overflow: hidden;
    min-height: 75px;
    border: ${props => props.border || "none"};
    `;

export const NodeHeader = styled.div`
    height: 30%;
    background-color: lightgreen;
    padding: 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    `;

export const Icon = styled.img`
    margin-right: 5px;
    `;

export const NodeMessage = styled.div`
    height: 70%;
    padding: 10px 30px;
    `;