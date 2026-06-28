## 2024-06-28 - [Prevent unnecessary re-renders in Zustand]
**Learning:** Destructuring the entire state object from a Zustand store (e.g., `const { addElement, activePageId } = useEditorStore()`) causes components to re-render on EVERY state change, even when the changed properties aren't used. For instance, `Toolbar` re-renders every time an element is moved or selected.
**Action:** Always use granular selectors `useEditorStore(state => state.property)` or `useShallow` when selecting multiple properties from a Zustand store to prevent unnecessary re-renders.
