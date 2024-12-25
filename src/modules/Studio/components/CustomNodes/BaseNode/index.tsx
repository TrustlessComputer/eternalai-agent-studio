import cx from 'clsx';

import { DragIcon } from '../../icons/common';

import { AreaClassName } from '@/modules/Studio/constants/area-class-name';
import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { NodeProps } from '@xyflow/react';

import { mergeIds } from '@/utils/flow';
import { useMemo } from 'react';
import FormRender from '../../DataFields/FormRender';
import Draggable from '../../DnD/Draggable';
import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';

type Props = NodeProps<StudioNode>;

const BaseNode = ({ data }: Props) => {
  const schemaData = useMemo(() => {
    return data?.metadata?.data?.current?.data;
  }, [data?.metadata?.data]);

  const children = useMemo(() => {
    return data?.metadata?.children;
  }, [data?.metadata?.children]);

  const nodeId = useMemo(() => data.metadata.nodeId, [data.metadata.nodeId]);
  const draggableId = useMemo(
    () => mergeIds([data.metadata.category.key, data.metadata.option.key, nodeId]),
    [data.metadata.category.key, data.metadata.option.key, nodeId],
  );

  return (
    <div className={cx('base-node', data.className)} id={nodeId}>
      <div className={cx('base-node_drag-icon', AreaClassName.DRAG_HANDLE)}>
        <DragIcon />
      </div>

      <div className="base-node_content">
        <Draggable
          id={draggableId}
          data={{
            isRight: true,
            category: data.metadata.category,
            option: data.metadata.option,
            data: schemaData,
            belongsTo: nodeId,
          }}
        >
          <Lego background={data.metadata.option.color} icon={data.metadata.option.icon}>
            <LegoContent>
              <TextRender data={data.metadata.option.title} />
              <FormRender id={nodeId} schemaData={schemaData} />
            </LegoContent>
          </Lego>
        </Draggable>

        {children?.map((item, index) => {
          const { id: prevNodeId } = item;
          const { category, option } = item.data.metadata;
          const draggableId = mergeIds([category.key, option.key, prevNodeId, index.toString()]);

          return (
            <Draggable
              id={draggableId}
              key={draggableId}
              data={{ isRight: true, category, option, data: schemaData, belongsTo: nodeId }}
            >
              <Lego background={option.color} icon={option.icon}>
                <LegoContent>
                  <TextRender data={option.title} />
                  <FormRender id={nodeId} schemaData={option.data} />
                </LegoContent>
              </Lego>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};

export default BaseNode;
