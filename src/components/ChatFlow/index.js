import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
    useReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
    MarkerType,
    Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NODE_TYPES } from '../../constants';
import SidePanel from '../SidePanel';
import { getUid } from '../../helper';
import { toast } from '../Toast';
import { FlowWrapper, FlowContainer, Navbar, NavbarToolsContainer, Button } from './ChatFlow.styled';


function ChatFlow() {
    const reactFlowWrapper = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isBackupAvailable, setIsBackupAvailable] = useState(false)
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { setViewport } = useReactFlow();

    const onConnect = useCallback((params) => setEdges((edges) => addEdge(params, edges)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/chatflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const newNode = {
                id: getUid(),
                type,
                position,
                data: { message: `text message ${reactFlowInstance.getNodes().length + 1}` },
            };

            // add new node to react flow
            setNodes((nodes) => nodes.concat(newNode));
        },
        [reactFlowInstance]
    );

    const saveFlow = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem('chatflow-bckp', JSON.stringify(flow));
        }
    }, [reactFlowInstance]);

    async function restoreFlow() {
        const flow = JSON.parse(localStorage.getItem('chatflow-bckp'));

        if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            setViewport({ x, y, zoom });
        }
    };

    useEffect(() => {
        if (localStorage.getItem('chatflow-bckp')) {
            setIsBackupAvailable(true);
            toast.default('Backup is available');
        }
    }, []);

    function handleNodeClick(ev, node) {
        if (node) {
            setNodes((nodes) => [...nodes, { ...node, data: { ...node.data, border: '1.5px solid #0A66C2' } }]);
            setSelectedNode(node);
        }
        else {
            setSelectedNode(null);
        }
    }

    return (
        <>
            {/* <Toast show={isBackupAvailable}>Backup is available</Toast> */}
            <Navbar>
                <NavbarToolsContainer>
                    {isBackupAvailable ? (
                        <Button onClick={restoreFlow}>Restore</Button>
                    ) : null}
                    <Button onClick={saveFlow}>Save changes</Button>
                </NavbarToolsContainer>
            </Navbar>
            <FlowWrapper ref={reactFlowWrapper}>
                <FlowContainer>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        nodeTypes={NODE_TYPES}
                        onConnect={onConnect}
                        defaultEdgeOptions={{
                            markerEnd: {
                                type: MarkerType.ArrowClosed,
                            },
                        }}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={handleNodeClick}
                        onPaneClick={handleNodeClick}
                    >
                        <Background color="#ccc" variant="cross" />
                        <Controls />
                    </ReactFlow>
                </FlowContainer>
                <SidePanel selectedNode={selectedNode} setNodes={setNodes} />
            </FlowWrapper>
        </>
    )
}

export default ChatFlow
