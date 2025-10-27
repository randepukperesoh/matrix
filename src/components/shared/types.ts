export interface IFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface IImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: IFormat;
    medium: IFormat;
    small: IFormat;
    large: IFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  // provider_metadata: any; // или более конкретный тип, если структура известна
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// types/lexical.ts (или в любом удобном месте)

export type BaseNode = {
  type: string;
  version?: number; // Lexical может добавлять версию
};

export type TextNode = BaseNode & {
  type: 'text';
  text: string;
  format?: number; // жирный, курсив и т.д.
  style?: string;
  mode?: 'normal' | 'segmented' | 'token' | 'code';
  detail?: number;
};

export type ElementNode = BaseNode & {
  children: LexicalNode[];
};

export type ParagraphNode = ElementNode & {
  type: 'paragraph';
};

export type ListNode = ElementNode & {
  type: 'list';
  format?: string; // например, 'left', 'center', 'right'
  indent?: number;
  listType: 'bullet' | 'number';
};

export type ListItemNode = ElementNode & {
  type: 'list-item';
};

export type AnyElementNode = ParagraphNode | ListNode | ListItemNode;

export type LexicalNode = TextNode | AnyElementNode;

// Тип для всего содержимого поля
export type LexicalContent = LexicalNode[];

export interface ISeo {
      title: string;
      description: string;
      keyword: string;
    }