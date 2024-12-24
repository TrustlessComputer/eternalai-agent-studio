import cx from 'clsx';

import { DragIcon } from '../../icons/common';

import { AREA_CLASS_NAME } from '@/modules/Studio/constants/area-class-name';
import './BaseNode.scss';
import { StudioNode } from '@/modules/Studio/types/graph';

import { NodeProps } from '@xyflow/react';

import Lego from '../../Lego';
import LegoContent from '../../LegoContent';

type Props = NodeProps<StudioNode>;

const BaseNode = ({ data }: Props) => {
  console.log('___________data', { data });

  // if (customizeRenderOnBoard && typeof customizeRenderOnBoard === 'function') {
  //   return customizeRenderOnBoard({});
  // }

  return (
    <div className="base-node">
      <div className={cx('base-node_drag-icon', AREA_CLASS_NAME.dragHandle)}>
        <DragIcon />
      </div>

      <div className="base-node_content">
        <Lego>
          <LegoContent>
            <p>Lego</p>
          </LegoContent>
        </Lego>
      </div>
    </div>
  );
};

export default BaseNode;
