import cx from 'clsx';

import { DragIcon } from '../../icons/common';

import { AreaClassName } from '@/modules/Studio/constants/area-class-name';
import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { NodeProps } from '@xyflow/react';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import Draggable from '../../DnD/Draggable';
import Lego from '../../Lego';
import LegoContent from '../../LegoContent';

type Props = NodeProps<StudioNode>;

const BaseNode = ({ data }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  // if (customizeRenderOnBoard && typeof customizeRenderOnBoard === 'function') {
  //   return customizeRenderOnBoard({});
  // }

  return (
    <div className="base-node">
      <div className={cx('base-node_drag-icon', AreaClassName.DRAG_HANDLE)}>
        <DragIcon />
      </div>

      <div className="base-node_content">
        <Draggable id={data.metadata.option.key} data={{ isRight: false, option: data.metadata.option }}>
          <Lego>
            <LegoContent>
              <p>Lego</p>
            </LegoContent>
          </Lego>
        </Draggable>
      </div>
    </div>
  );
};

export default BaseNode;
