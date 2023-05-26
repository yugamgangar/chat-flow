import React, { useState, useEffect } from 'react';
import MessageNode from './Nodes/MessageNode';
import { SidePanelContainer, NodeContainer, SettingsPanelHeader, SettingsPanelElementWrapper } from './SidePanel.styled';

function SidePanel({ selectedNode, setNodes }) {

    const [textInput, setTextInput] = useState(selectedNode?.data?.message || '')

    useEffect(() => {
        if (selectedNode && selectedNode.data.message !== textInput) {
            setTextInput(selectedNode.data.message);
        }
    }, [selectedNode])

    function handleInputChange({ target: { value } }) {
        setTextInput(value);
        setNodes((nodes) => [...nodes, { ...selectedNode, data: { message: value } }]);
    }

    function handleDragStart(event) {
        event.dataTransfer.setData('application/chatflow', 'textnode');
        event.dataTransfer.effectAllowed = "move";
    }

    return (
        <SidePanelContainer>
            {!selectedNode ? (
                <NodeContainer>
                    <MessageNode handleDragStart={handleDragStart} />
                </NodeContainer>
            ) : (
                    <React.Fragment>
                        <SettingsPanelHeader>Message</SettingsPanelHeader>
                        <SettingsPanelElementWrapper>
                            <label htmlFor="node-text">Text</label>
                            <br />
                            <textarea rows={3} type="text" id="node-text" value={textInput} onChange={handleInputChange} />
                        </SettingsPanelElementWrapper>
                    </React.Fragment>
                )}
        </SidePanelContainer>
    )
}

export default SidePanel
