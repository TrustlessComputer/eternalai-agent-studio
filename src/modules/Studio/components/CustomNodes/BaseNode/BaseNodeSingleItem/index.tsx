import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { DraggableDataType } from '@/modules/Studio/types/dnd';
import { useMemo } from 'react';
import BaseNodeWrapper from '../BaseNodeWrapper';
import Product from '../../../DnD/Product';
import LegoRender from '../LegoRender';
import Package from '../../../DnD/Package';
import BaseNodeConnection from '../BaseNodeConnection';
import { BaseNodeProps } from '../types';

import './BaseNodeSingleItem.scss';

type Props = BaseNodeProps;
const BaseNodeSingleItem = ({ data }: Props) => {
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);

  const key = data.metadata.key;
  const option = categoryMap[key] as StudioCategoryMap;
  const schemaData = option.data;

  const productData: Omit<DraggableDataType, 'type'> = useMemo(
    () => ({ optionKey: option.key, belongsTo: data.id }),
    [data.id, option.key],
  );

  const packageData = useMemo(() => ({ belongsTo: data.id }), [data.id]);

  return (
    <BaseNodeWrapper option={option}>
      <div className="base-node-wrapper">
        <div className="base-node-wrapper__single">
          <Product id={data.id} data={productData}>
            <LegoRender
              background={option.color}
              icon={option.icon}
              title={option.title}
              id={data.id}
              schemaData={schemaData}
              categoryKey={option.key}
              render={option.customizeRenderOnBoard}
            />
          </Product>
        </div>

        <Package id={data.id} data={packageData} />
        <BaseNodeConnection />
      </div>
    </BaseNodeWrapper>
  );
};

export default BaseNodeSingleItem;
