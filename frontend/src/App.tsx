import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { CanvasArea } from './components/CanvasArea';

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 text-gray-900 font-sans">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <CanvasArea />
      </div>
    </div>
  );
}

export default App;
