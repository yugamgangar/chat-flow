import React from 'react'
import { Handle, Position } from 'reactflow';
import { NodeHeader, NodeWrapper, Icon, NodeMessage } from './TextNode.styled';

function TextNode({ data }) {

    return (
        <NodeWrapper border={data.border} >
            <Handle type="target" position={Position.Left} />
            <NodeHeader>
                <Icon src="img/sms-icon.png" />
                <span>Send Message</span>
            </NodeHeader>
            <NodeMessage>
                {data.message}
            </NodeMessage>
            <Handle type="source" position={Position.Right} />
        </NodeWrapper>
    )
}

export default TextNode
