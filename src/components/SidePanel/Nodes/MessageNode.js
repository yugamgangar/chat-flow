import React from 'react'
import { NodeWrapper } from '../SidePanel.styled';

function MessageNode({ handleDragStart }) {
    return (
        <NodeWrapper draggable onDragStart={handleDragStart}>
            <img src="img/sms-icon.png" height="20" width="20" />
            <div>Message</div>
        </NodeWrapper>
    )
}

export default MessageNode
