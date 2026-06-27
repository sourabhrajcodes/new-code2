## 2024-05-18 - Zustand store destructuring causes excessive re-renders
**Learning:** Using `const { a, b } = useStore()` with Zustand subscribes the component to the entire store, causing it to re-render whenever *any* part of the store changes. This is exceptionally problematic in a canvas editor where state (like x/y coordinates of an element during drag) updates continuously.
**Action:** Always use selector functions `const a = useStore(state => state.a)` when accessing Zustand state to ensure the component only re-renders when the specific state it relies on changes.
