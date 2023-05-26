import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import ChatFlow from './components/ChatFlow';

function App() {

  return (
    <ReactFlowProvider>
      <ChatFlow />
    </ReactFlowProvider>
  );
}

export default App;
