import cs from 'clsx';
import React, { useMemo } from 'react';

import TextRender from '../../../Render/TextRender';
import './NodeBaseWrapper.scss';

import Package from '@/modules/Studio/components/DnD/Package';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import { StudioInternalDataNode } from '@/modules/Studio/types';
import { StudioCategoryOption } from '@/modules/Studio/types/category';
import { DraggableData } from '@/modules/Studio/types/dnd';

type Props = {
  id: string;
  data: StudioInternalDataNode;
  children: React.ReactNode;
  option: StudioCategoryOption;
  isDroppable?: boolean;
  style?: React.CSSProperties;
};

function NodeBaseWrapper({ id, data, option, children, isDroppable = false, style }: Props) {
  // check if have linked children
  const linkedNodes = useStudioFlowStore((state) => state.linkedNodes);
  const isHaveLinkedChildren = useMemo(() => {
    return !!data?.metadata?.children?.length && linkedNodes[id]?.length > 0;
  }, [linkedNodes, id, data?.metadata?.children?.length]);

  const extendedData = useMemo(() => {
    return {
      belongsTo: id,
      optionKey: option.idx,
      categoryKey: useStudioCategoryStore.getState().findCategoryByOptionKey(option.idx)?.idx,
      id: data.id,
    } satisfies Omit<DraggableData, 'type'>;
  }, [id, option.idx, data.id]);

  const styles = useMemo(() => {
    return {
      padding: '16px',
      ...style,
    };
  }, [style]);

  if (option?.boxWrapper) {
    if (option.boxWrapper.render) {
      return option.boxWrapper.render(children, option);
    }

    if (option.boxWrapper.title) {
      return (
        <div className="node-base-wrapper">
          <div className="node-base-wrapper__title">
            <TextRender data={option.boxWrapper.title} />
          </div>

          <div className="node-base-wrapper__content">{children}</div>
        </div>
      );
    }
  }

  if (isDroppable) {
    if (isHaveLinkedChildren) {
      return (
        <Package
          id={data.id}
          data={extendedData}
          className={cs('node-base-wrapper', { 'node-base-wrapper--linked': isHaveLinkedChildren })}
          style={styles}
        >
          <div className="node-base-wrapper__content">{children}</div>
        </Package>
      );
    }

    return (
      <Package id={data.id} data={extendedData} className="node-base-wrapper" style={styles}>
        {children}
      </Package>
    );
  }

  if (isHaveLinkedChildren) {
    return (
      <div
        id={data.id}
        className={cs('node-base-wrapper', { 'node-base-wrapper--linked': isHaveLinkedChildren })}
        style={styles}
      >
        <div className="node-base-wrapper__content">{children}</div>
      </div>
    );
  }

  return (
    <div id={data.id} className="node-base-wrapper" style={styles}>
      {children}
    </div>
  );
}

export default NodeBaseWrapper;
