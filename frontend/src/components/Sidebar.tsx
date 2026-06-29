import { useEditorStore } from '../store/useEditorStore';

export const Sidebar = () => {
  // Optimization: use granular selectors to prevent unnecessary re-renders
  const pages = useEditorStore(state => state.pages);
  const activePageId = useEditorStore(state => state.activePageId);
  const addPage = useEditorStore(state => state.addPage);
  const setActivePage = useEditorStore(state => state.setActivePage);
  const selectedElementId = useEditorStore(state => state.selectedElementId);

  return (
    <div className="w-64 bg-white border-r flex flex-col h-full shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-700">Pages</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {pages.map((page, index) => (
          <div
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center bg-gray-50 hover:border-blue-300 transition-colors ${
              activePageId === page.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            style={{ aspectRatio: '1 / 1.414' }} // A4 aspect ratio approx
          >
            <span className="text-gray-500 font-medium">Page {index + 1}</span>
          </div>
        ))}

        <button
          onClick={addPage}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-blue-500 hover:border-blue-500 transition-colors flex items-center justify-center"
        >
          + Add Page
        </button>
      </div>

      {selectedElementId && (
        <div className="h-1/2 border-t flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-700">Properties</h2>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
             <div className="text-sm text-gray-500">
               Select an element to view properties.
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
