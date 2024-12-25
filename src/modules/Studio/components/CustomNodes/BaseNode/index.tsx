import cx from 'clsx';

import { DragIcon } from '../../icons/common';

import { AREA_CLASS_NAME } from '@/modules/Studio/constants/area-class-name';
import './BaseNode.scss';
import { StudioNode } from '@/modules/Studio/types/graph';

import { NodeProps } from '@xyflow/react';

import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import { useMemo } from 'react';
import FormRender from '../../DataFields/FormRender';

type Props = NodeProps<StudioNode>;

const BaseNode = ({ data }: Props) => {
  const schemaData = useMemo(() => {
    return data?.metadata?.data?.current?.data;
  }, [data?.metadata?.data]);

  const nodeId = data.metadata.nodeId;

  return (
    <div className="base-node">
      <div className={cx('base-node_drag-icon', AREA_CLASS_NAME.dragHandle)}>
        <DragIcon />
      </div>

      <div className="base-node_content">
        <Lego>
          <LegoContent>
            <span>Lego</span>
            <FormRender id={nodeId} schemaData={schemaData} />
          </LegoContent>
        </Lego>
      </div>
    </div>
  );
};

export default BaseNode;
