export type ElementType = 'text' | 'table' | 'image';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  isLocked?: boolean;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  fontSize: number;
  fontFamily: string;
  fill: string;
  align: 'left' | 'center' | 'right';
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface TableCell {
  id: string;
  content: string;
  width: number;
  height: number;
  fill?: string;
  colSpan?: number;
  rowSpan?: number;
}

export interface TableRow {
  id: string;
  cells: TableCell[];
  height: number;
}

export interface TableElement extends BaseElement {
  type: 'table';
  rows: TableRow[];
}

export type PageElement = TextElement | TableElement;

export interface Page {
  id: string;
  elements: PageElement[];
  width: number;
  height: number;
}
