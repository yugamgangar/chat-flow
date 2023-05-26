import styled from 'styled-components';

export const SidePanelContainer = styled.div`
    flex-basis: 20%;
    border-left: 1px solid gray;
`;

export const NodeContainer = styled.div`
    padding: 15px;
`;

export const NodeWrapper = styled.div`
    border: 1px solid #0A66C2;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    cursor: pointer;
`;

export const SettingsPanelHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 0px;
`;

export const SettingsPanelElementWrapper = styled.div`
    border-bottom: 1px solid lightgray;
    border-top: 1px solid lightgray;
    padding: 15px 10px;
`;
