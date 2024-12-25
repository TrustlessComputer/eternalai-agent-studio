import cx from 'clsx';

import { DragIcon } from '../../icons/common';

import { AreaClassName } from '@/modules/Studio/constants/area-class-name';
import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { NodeProps } from '@xyflow/react';

import { mergeIds } from '@/utils/flow';
import { FunctionComponent, useMemo } from 'react';
import FormRender from '../../DataFields/FormRender';
import Draggable from '../../DnD/Draggable';
import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';
import { DataSchema } from '@/modules/Studio/types/category';

type Props = NodeProps<StudioNode>;

const LegoRender = ({
  background,
  icon,
  id,
  schemaData,
  title,
}: {
  background?: string;
  icon: React.ReactNode | FunctionComponent;
  id: string;
  schemaData?: DataSchema;
  title: React.ReactNode | FunctionComponent;
}) => {
  return (
    <Lego background={background} icon={icon}>
      <LegoContent>
        <TextRender data={title} />
        <FormRender id={id} schemaData={schemaData} />
      </LegoContent>
    </Lego>
  );
};
const BaseNode = ({ data }: Props) => {
  const schemaData = useMemo(() => {
    return data?.metadata?.data?.current?.data;
  }, [data?.metadata?.data]);

  const children = useMemo(() => {
    return data?.metadata?.children;
  }, [data?.metadata?.children]);

  const nodeId = useMemo(() => data.metadata.nodeId, [data.metadata.nodeId]);

  return (
    <div className={cx('base-node', data.className)} id={nodeId}>
      <div className={cx('base-node_drag-icon', AreaClassName.DRAG_HANDLE)}>
        <DragIcon />
      </div>

      <div className="base-node_content">
        <Draggable
          id={mergeIds([data.metadata.category.key, data.metadata.option.key, nodeId])}
          data={{ isRight: true, category: data.metadata.category, option: data.metadata.option, data: schemaData }}
        >
          <LegoRender
            background={data.metadata.option.color}
            icon={data.metadata.option.icon}
            title={data.metadata.option.title}
            id={nodeId}
            schemaData={schemaData}
          />
        </Draggable>

        {children?.map((item, index) => {
          const { category, option } = item.data.metadata;

          return (
            <Draggable
              id={mergeIds([category.key, option.key, nodeId, index.toString()])}
              data={{ isRight: true, category, option, data: schemaData }}
              key={mergeIds([category.key, option.key, index.toString()])}
            >
              <LegoRender
                background={option.color}
                icon={option.icon}
                title={option.title}
                id={nodeId}
                schemaData={option.data}
              />
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};

export default BaseNode;
