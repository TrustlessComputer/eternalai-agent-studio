import { HTMLAttributes, memo, ReactNode } from 'react';
import { DragIcon, EllipsisIcon } from '../../icons/common';

type Props = HTMLAttributes<HTMLDivElement> & {
  actions: {
    content: ReactNode;
    onClick: () => void;
  }[];
};

const BaseNode = ({ actions, children, ...rest }: Props) => {
  return (
    <div className="node" {...rest}>
      <div className="node_drag-icon drag-handle-area">
        <DragIcon />
      </div>

      <div className="node_content">{children}</div>

      {actions.length > 0 && (
        <div className="node_actions">
          <EllipsisIcon />

          {/* {actions.map((action, index) => (
            <div key={index} onClick={action.onClick}>
              {action.content}
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
};

export default memo(BaseNode);
