import cx from 'clsx';
import { HTMLAttributes, memo, ReactNode } from 'react';

import { DragIcon, EllipsisIcon } from '../../icons/common';

import { AREA_CLASS_NAME } from '@/modules/Studio/constants/area-class-name';
import './BaseNode.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  actions: {
    content: ReactNode;
    onClick: () => void;
  }[];
};

const BaseNode = ({ actions, children, ...rest }: Props) => {
  return (
    <div className="base-node" {...rest}>
      <div className={cx('base-node_drag-icon', AREA_CLASS_NAME.dragHandle)}>
        <DragIcon />
      </div>

      <div className="base-node_content">{children}</div>

      {actions.length > 0 && (
        <div className="base-node_actions">
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
