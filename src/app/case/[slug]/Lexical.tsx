import {
  LexicalContent,
  LexicalNode,
  ListItemNode,
  ListNode,
  ParagraphNode,
  TextNode,
} from "@/components/shared/types";
import React, { ReactNode } from "react";
const renderFormattedText = (node: TextNode): React.ReactNode => {
  let content: ReactNode = node.text;
  if (node.format) {
    if (node.format & 1) {
      content = <strong>{content}</strong>;
    }
    if (node.format & 2) content = <em>{content}</em>;
    if (node.format & 8) content = <u>{content}</u>;
  }
  return content;
};

const NodeRenderer: React.FC<{ node: LexicalNode }> = ({ node }) => {
  // Узел текста
  if (node.type === "text") {
    return renderFormattedText(node as TextNode);
  }

  // Узел параграфа
  if (node.type === "paragraph") {
    const paragraphNode = node as ParagraphNode;
    return (
      <p>
        {paragraphNode.children?.map((child, index) => (
          <NodeRenderer key={index} node={child} />
        ))}
      </p>
    );
  }

  if (node.type === "list") {
    const listNode = node as ListNode;
    const Tag = listNode.listType === "number" ? "ol" : "ul";
    return (
      <Tag className="p-[0_0_0_1rem]">
        {listNode.children?.map((child, index) => (
          <NodeRenderer key={index} node={child} />
        ))}
      </Tag>
    );
  }

  if (node.type === "list-item") {
    const listItemNode = node as ListItemNode;
    return (
      <li className="list-disc">
        {listItemNode.children?.map((child, index) => (
          <NodeRenderer key={index} node={child} />
        ))}
      </li>
    );
  }

  console.warn(`Unknown node type: ${node}`, node);
  return null;
};

const LexicalRenderer: React.FC<{ content: LexicalContent }> = ({
  content,
}) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="lexical-content">
      {content.map((node, index) => (
        <NodeRenderer key={index} node={node} />
      ))}
    </div>
  );
};

export default LexicalRenderer;
