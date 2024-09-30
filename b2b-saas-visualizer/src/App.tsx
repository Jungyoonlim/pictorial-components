import React from 'react';
import B2BSaasDbVisualizer from './B2BSaasDbVisualizer';
import { AppProvider } from './context'; 

function App() {
  return (
    <AppProvider>
      <div className="App">
        <B2BSaasDbVisualizer />
      </div>
    </AppProvider>
  );
}

export default App;
