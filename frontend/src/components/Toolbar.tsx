import { Type, Table, Download, Save, Undo, Redo, LayoutTemplate } from 'lucide-react';
import { useEditorStore } from '../store/useEditorStore';
import type { TextElement } from '../types';

export const Toolbar = () => {
  // ⚡ Bolt Performance: Use granular selectors to prevent unnecessary re-renders when other state changes
  const addElement = useEditorStore(state => state.addElement);
  const activePageId = useEditorStore(state => state.activePageId);

  const handleAddText = () => {
    if (!activePageId) return;

    const newTextElement: TextElement = {
      id: crypto.randomUUID(),
      type: 'text',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      content: 'Double click to edit text',
      fontSize: 16,
      fontFamily: 'Arial',
      fill: '#000000',
      align: 'left',
    };

    addElement(activePageId, newTextElement);
  };

  return (
    <div className="h-14 bg-white border-b flex items-center px-4 justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 mr-4">
          <LayoutTemplate className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-lg">PDFGenius</span>
        </div>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <button
          onClick={handleAddText}
          className="p-2 hover:bg-gray-100 rounded flex items-center space-x-1"
          title="Add Text"
        >
          <Type className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium">Text</span>
        </button>

        <button className="p-2 hover:bg-gray-100 rounded flex items-center space-x-1" title="Add Table">
          <Table className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium">Table</span>
        </button>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <button className="p-2 hover:bg-gray-100 rounded" title="Undo">
          <Undo className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded" title="Redo">
          <Redo className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded flex items-center space-x-1">
          <Save className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium">Save</span>
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center space-x-2 shadow-sm transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Export PDF</span>
        </button>
      </div>
    </div>
  );
};
