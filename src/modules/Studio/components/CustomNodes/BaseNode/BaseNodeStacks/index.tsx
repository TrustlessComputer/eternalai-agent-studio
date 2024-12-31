import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { BaseNodeProps } from '../types';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { DraggableDataType } from '@/modules/Studio/types/dnd';
import { useMemo } from 'react';
import BaseNodeWrapper from '../BaseNodeWrapper';
import Product from '../../../DnD/Product';
import BaseNodeReadonly from '../BaseNodeReadonly';
import DraggingFloating from '../DraggingFloating';
import LegoRender from '../LegoRender';
import ChildBaseNode from '../ChildBaseNode';
import Package from '../../../DnD/Package';
import BaseNodeConnection from '../BaseNodeConnection';

import './BaseNodeStacks.scss';

type Props = BaseNodeProps;
const BaseNodeStacks = ({ data, ...rest }: Props) => {
  const draggingData = useStudioDndStore((state) => state.draggingData);
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);
  const children = data?.metadata?.children;

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  const productData: Omit<DraggableDataType, 'type'> = useMemo(
    () => ({ optionKey: option.keyMapper, belongsTo: data.id }),
    [data.id, option.keyMapper],
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
              <BaseNodeReadonly {...rest} data={data} />
              {renderChildren.map((item) => (
                <DraggingFloating key={`dragging-floating-${item.id}`} data={item} />
              ))}
            </div>
          }
        >
          <LegoRender
            background={option.color}
            icon={option.icon}
            title={option.title}
            id={data.id}
            schemaData={schemaData}
            categoryKey={option.keyMapper}
            render={option.customizeRenderOnBoard}
          />
        </Product>

        {renderChildren?.map((item, index) => (
          <ChildBaseNode
            index={index}
            key={`base-node-child-${item.id}`}
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
