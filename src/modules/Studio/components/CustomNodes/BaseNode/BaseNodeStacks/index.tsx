import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { DraggableData } from '@/modules/Studio/types/dnd';
import { useMemo } from 'react';
import Package from '../../../DnD/Package';
import Product from '../../../DnD/Product';
import BaseNodeConnection from '../BaseNodeConnection';
import BaseNodeWrapper from '../BaseNodeWrapper';
import ChildBaseNode from '../ChildBaseNode';
import DraggingFloating from '../DraggingFloating';
import LegoRender from '../LegoRender';
import { BaseNodeProps } from '../types';
import BaseNodeReadOnly from '../BaseNodeReadOnly';

import './BaseNodeStacks.scss';

type Props = BaseNodeProps;
const BaseNodeStacks = ({ data, ...rest }: Props) => {
  const draggingData = useStudioDndStore((state) => state.draggingData);
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);
  const children = data?.metadata?.children;

  const idx = data.metadata.idx;
  const option = categoryMap[idx] as StudioCategoryMap;
  const schemadata = option.data;

  const productData: Omit<DraggableData, 'type'> = useMemo(
    () => ({ optionKey: option.idx, belongsTo: data.id }),
    [data.id, option.idx],
  );

  const renderChildren = useMemo(() => {
    if (!draggingData || draggingData.childIndex === undefined || draggingData.belongsTo !== data.id) return children;

    return children.slice(0, draggingData.childIndex + 1);
  }, [draggingData, data.id, children]);

  const packageData = useMemo(() => ({ belongsTo: data.id }), [data.id]);

  return (
    <BaseNodeWrapper option={option}>
      <div className="base-node-wrapper">
        <Product
          id={data.id}
          data={productData}
          draggingFloating={
            <div>
              <BaseNodeReadOnly {...rest} data={data} />
              {renderChildren.map((item) => (
                <DraggingFloating key={`dragging-floating-${data.id}-${item.id}`} data={item} />
              ))}
            </div>
          }
        >
          <LegoRender
            background={option.color}
            icon={option.icon}
            title={option.title}
            id={data.id}
            schemadata={schemadata}
            idx={option.idx}
            render={option.customizeRenderOnBoard}
          />
        </Product>

        {renderChildren?.map((item, index) => (
          <ChildBaseNode
            index={index}
            key={`base-node-child-${data.id}-${item.id}`}
            data={item}
            items={children}
            belongsTo={data.id}
          />
        ))}

        <Package id={data.id} data={packageData} />
        <BaseNodeConnection />
      </div>
    </BaseNodeWrapper>
  );
};

export default BaseNodeStacks;
