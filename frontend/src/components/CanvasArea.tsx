import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Transformer } from 'react-konva';
import { useEditorStore } from '../store/useEditorStore';
import { useShallow } from 'zustand/react/shallow';
import type { TextElement, PageElement } from '../types';

interface ElementWrapperProps {
  element: PageElement;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: Partial<PageElement>) => void;
}

const ElementWrapper: React.FC<ElementWrapperProps> = ({ element, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  if (element.type === 'text') {
    const textEl = element as TextElement;
    return (
      <React.Fragment>
        <Text
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...textEl}
          text={textEl.content}
          draggable={!element.isLocked}
          onDragEnd={(e) => {
            onChange({
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={() => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);

            onChange({
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            });
          }}
        />
        {isSelected && !element.isLocked && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </React.Fragment>
    );
  }

  // Placeholder for tables
  return null;
};

export const CanvasArea = () => {
  // ⚡ Bolt Optimization: Using useShallow avoids full component re-renders
  // when unrelated properties in the store change, maintaining 60fps during canvas interactions.
  const { pages, activePageId, selectedElementId, selectElement, updateElement } = useEditorStore(
    useShallow((state) => ({
      pages: state.pages,
      activePageId: state.activePageId,
      selectedElementId: state.selectedElementId,
      selectElement: state.selectElement,
      updateElement: state.updateElement,
    }))
  );

  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const [scale] = useState(1);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage() || e.target.name() === 'page-background';
    if (clickedOnEmpty) {
      selectElement(null);
    }
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-auto flex justify-center py-8">
      <div
        className="bg-white shadow-lg relative"
        style={{ width: activePage.width * scale, height: activePage.height * scale }}
      >
        <Stage
          width={activePage.width * scale}
          height={activePage.height * scale}
          scaleX={scale}
          scaleY={scale}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={activePage.width}
              height={activePage.height}
              fill="white"
              name="page-background"
            />
            {activePage.elements.map((element) => (
              <ElementWrapper
                key={element.id}
                element={element}
                isSelected={element.id === selectedElementId}
                onSelect={() => selectElement(element.id)}
                onChange={(newAttrs) => updateElement(activePage.id, element.id, newAttrs)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
