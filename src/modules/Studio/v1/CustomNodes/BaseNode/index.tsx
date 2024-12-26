import cx from 'clsx';

import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { NodeProps } from '@xyflow/react';
import Draggable from '@/modules/Studio/components/DnD/Draggable';
import FormRender from '@/modules/Studio/components/DataFields/FormRender';
import Lego from '@/modules/Studio/components/Lego';
import LegoContent from '@/modules/Studio/components/LegoContent';
import TextRender from '@/modules/Studio/components/Render/TextRender';
import { DataSchema } from '@/modules/Studio/types/category';
import { mergeIds } from '@/utils/flow';
import { FunctionComponent, useMemo } from 'react';
import { NodeType } from '@/modules/Studio/enums/node-type';
import { AreaClassName } from '@/modules/Studio/constants/area-class-name';
import { DragIcon } from '@/modules/Studio/components/icons/common';

type Props = NodeProps<StudioNode>;

const LegoRender = ({
  background,
  icon,
  id,
  schemaData,
  title,
  categoryId,
}: {
  background?: string;
  icon: React.ReactNode | FunctionComponent;
  id: string;
  schemaData?: DataSchema;
  title: React.ReactNode | FunctionComponent;
  categoryId: string;
}) => {
  const fields = useMemo(() => Object.keys(schemaData || {}), [schemaData]);
  const isDynamicHeight = useMemo(() => fields.length > 1, [fields]);

  return (
    <Lego background={background} icon={icon} fixedHeight={!isDynamicHeight}>
      <LegoContent>
        <FormRender categoryId={categoryId} id={id} schemaData={schemaData}>
          <TextRender data={title} />
        </FormRender>
      </LegoContent>
    </Lego>
  );
};

const BaseNode = ({ data }: Props) => {
  const { schemaData, children, nodeId, draggableId } = useMemo(() => {
    const schemaData = data.type === NodeType.BASE ? data.metadata.data.current?.data : {};
    const children = data.type === NodeType.BASE ? data.metadata.children : [];
    const nodeId = data.type === NodeType.BASE ? data.metadata.nodeId : '';
    const draggableId =
      data.type === NodeType.BASE ? mergeIds([data.metadata.category.key, data.metadata.option.key, nodeId]) : '';

    return { schemaData, children, nodeId, draggableId };
  }, [data]);

  return (
    <div className={cx('base-node', data.className)} id={nodeId}>
      {/* <div className={cx('base-node__drag-icon', AreaClassName.DRAG_HANDLE)}>
        <span>
          <DragIcon />
        </span>
      </div> */}
      <div className="base-node__content">
        <Draggable
          id={draggableId}
          // disabled={children?.length > 0}
          data={{
            isRight: true,
            isParent: true,
            category: data.metadata.category,
            option: data.metadata.option,
            data: schemaData,
            belongsTo: nodeId,
          }}
        >
          <LegoRender
            background={data.metadata.option.color}
            icon={data.metadata.option.icon}
            title={data.metadata.option.title}
            id={nodeId}
            schemaData={schemaData}
            categoryId={data.metadata.option.keyMapper}
          />
        </Draggable>

        {/* {children?.map((item, index) => {
          const { category, option } = item.data.metadata;
          const draggableId = mergeIds([category.key, option.key, item.id, index.toString()]);

          return (
            <Draggable
              id={draggableId}
              key={draggableId}
              data={{
                isRight: true,
                isParent: false,
                category,
                option,
                data: schemaData,
                belongsTo: item.id,
                metadata: item,
              }}
            >
              <LegoRender
                background={option.color}
                icon={option.icon}
                title={option.title}
                id={item.id}
                schemaData={option.data}
                categoryId={option.keyMapper}
              />
            </Draggable>
          );
        })} */}
      </div>
    </div>
  );
};

export default BaseNode;
