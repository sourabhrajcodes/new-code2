import { create } from 'zustand';
import type { Page, PageElement } from '../types';

interface EditorState {
  pages: Page[];
  selectedElementId: string | null;
  activePageId: string | null;

  // Actions
  addPage: () => void;
  addElement: (pageId: string, element: PageElement) => void;
  updateElement: (pageId: string, elementId: string, updates: Partial<PageElement>) => void;
  deleteElement: (pageId: string, elementId: string) => void;
  selectElement: (elementId: string | null) => void;
  setActivePage: (pageId: string) => void;
}

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

const createEmptyPage = (): Page => ({
  id: crypto.randomUUID(),
  elements: [],
  width: A4_WIDTH,
  height: A4_HEIGHT,
});

export const useEditorStore = create<EditorState>((set) => {
  const initialPage = createEmptyPage();

  return {
    pages: [initialPage],
    selectedElementId: null,
    activePageId: initialPage.id,

    addPage: () => set((state) => ({
      pages: [...state.pages, createEmptyPage()]
    })),

    addElement: (pageId, element) => set((state) => ({
      pages: state.pages.map(page =>
        page.id === pageId
          ? { ...page, elements: [...page.elements, element] }
          : page
      )
    })),

    updateElement: (pageId, elementId, updates) => set((state) => ({
      pages: state.pages.map(page =>
        page.id === pageId
          ? {
              ...page,
              elements: page.elements.map(el => {
                if (el.id === elementId) {
                   // Ensure type safety when applying updates
                   if (el.type === 'text') {
                      return { ...el, ...updates } as PageElement;
                   }
                   if (el.type === 'table') {
                      return { ...el, ...updates } as PageElement;
                   }
                   return el;
                }
                return el;
              })
            }
          : page
      )
    })),

    deleteElement: (pageId, elementId) => set((state) => ({
      pages: state.pages.map(page =>
        page.id === pageId
          ? {
              ...page,
              elements: page.elements.filter(el => el.id !== elementId)
            }
          : page
      )
    })),

    selectElement: (elementId) => set({ selectedElementId: elementId }),

    setActivePage: (pageId) => set({ activePageId: pageId }),
  };
});
