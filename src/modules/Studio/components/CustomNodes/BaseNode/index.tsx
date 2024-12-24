import cx from 'clsx';

import { DragIcon } from '../../icons/common';

import { AREA_CLASS_NAME } from '@/modules/Studio/constants/area-class-name';
import './BaseNode.scss';
import { StudioNode } from '@/modules/Studio/types/graph';

import { NodeProps } from '@xyflow/react';

import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';

type Props = NodeProps<StudioNode>;

const BaseNode = ({ data }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);
  console.log('___________data', { data, mapCategories });

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
