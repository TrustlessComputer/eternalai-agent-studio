import cx from 'clsx';

import { DragIcon } from '../../icons/common';

import { AreaClassName } from '@/modules/Studio/constants/area-class-name';
import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { NodeProps } from '@xyflow/react';

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

  const nodeId = data.metadata.nodeId;

  return (
    <div className="base-node">
      <div className={cx('base-node_drag-icon', AreaClassName.DRAG_HANDLE)}>
        <DragIcon />
      </div>

      <div className="base-node_content">
        <Draggable id={data.metadata.option.key} data={{ isRight: true, option: data.metadata.option }}>
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
