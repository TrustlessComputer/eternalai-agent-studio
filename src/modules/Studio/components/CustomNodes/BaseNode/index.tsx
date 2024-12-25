import cx from 'clsx';

import { DragIcon } from '../../icons/common';

import { AreaClassName } from '@/modules/Studio/constants/area-class-name';
import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { NodeProps } from '@xyflow/react';

import { mergeIds } from '@/utils/flow';
import { memo, useMemo } from 'react';
import FormRender from '../../DataFields/FormRender';
import Draggable from '../../DnD/Draggable';
import Lego from '../../Lego';
import LegoContent from '../../LegoContent';

type Props = NodeProps<StudioNode>;

const BaseNode = ({ data }: Props) => {
  const schemaData = useMemo(() => {
    return data?.metadata?.data?.current?.data;
  }, [data?.metadata?.data]);
  const children = useMemo(() => {
    return data?.metadata?.children;
  }, [data?.metadata?.children]);

  const nodeId = data.metadata.nodeId;

  return (
    <div className="base-node">
      <div className={cx('base-node_drag-icon', AreaClassName.DRAG_HANDLE)}>
        <DragIcon />
      </div>

      <div className="base-node_content">
        <Draggable
          id={mergeIds([data.metadata.category.key, data.metadata.option.key, nodeId])}
          disabled
          data={{ isRight: true, category: data.metadata.category, option: data.metadata.option, data: schemaData }}
        >
          <Lego>
            <LegoContent>
              <span>Lego</span>
              <FormRender id={nodeId} schemaData={schemaData} />
            </LegoContent>
          </Lego>
        </Draggable>
      </div>
    </div>
  );
};

export default memo(BaseNode);
