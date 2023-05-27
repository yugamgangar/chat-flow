import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
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
import toast, { Toaster } from 'react-hot-toast';
import TextNode from '../FlowNodes/TextNode';
import SidePanel from '../SidePanel';
import { getUid, validateFlow } from './ChatFlow.helper';
import { FlowWrapper, FlowContainer, Navbar, NavbarToolsContainer, Button } from './ChatFlow.styled';


function ChatFlow() {
    const reactFlowWrapper = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isBackupAvailable, setIsBackupAvailable] = useState(false)
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
            if (validateFlow(flow.nodes, flow.edges)) {
                localStorage.setItem('chatflow-bckp', JSON.stringify(flow));
                toast.success('Changes saved.')
            }
            else {
                toast.error(`Cannot save flow.`);
            }

        }
    }, [reactFlowInstance]);

    async function restoreFlow() {
        const flow = JSON.parse(localStorage.getItem('chatflow-bckp'));

        if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            setViewport({ x, y, zoom });
            setIsBackupAvailable(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('chatflow-bckp')) {
            setIsBackupAvailable(true);
            toast('Backup is available');
        }
    }, []);

    function handleNodeClick(ev, node) {
        if (node) {
            setNodes((nodes) => nodes.map(currentNode => {
                if (currentNode.id === node.id) {
                    return { ...currentNode, data: { ...currentNode.data, border: '1.5px solid #0A66C2' } }
                }
                else {
                    return { ...currentNode, data: { message: currentNode.data.message } }
                }
            }));
            setSelectedNode(node);
        }
        else {
            setNodes((nodes) => nodes.map(currentNode => ({ ...currentNode, data: { message: currentNode.data.message } })));
            setSelectedNode(null);
        }
    }

    const NODE_TYPES = useMemo(() => ({ textnode: TextNode }), []);

    return (
        <>
            <Toaster />
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
