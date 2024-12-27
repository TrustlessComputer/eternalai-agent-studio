import useStudioDataStore from '@/modules/Studio/stores/useStudioDataStore';
import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DndType, DraggableDataType } from '@/modules/Studio/types/dnd';
import { useDroppable } from '@dnd-kit/core';
import cx from 'clsx';
import React, { useMemo } from 'react';
import './Droppable.scss';
// import Lego from '../../Lego';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: Omit<DraggableDataType, 'type'>;
  disabled?: boolean; // means the droppable do not accept any droppable
};

const Package = ({ id, data, disabled, className, children, ...props }: Props) => {
  const draggingElement = useStudioDndStore((state) => state.draggingElement);

  const extendedData = useMemo(() => {
    return {
      ...data,
      type: DndType.PACKAGE,
    } satisfies DraggableDataType;
  }, [data, id]);

  const { setNodeRef, isOver, active } = useDroppable({
    id,
    data: extendedData,
    disabled,
  });

  const isSelf = useMemo(() => {
    if (isOver) {
      return active?.id === id;
    }

    return isOver;
  }, [active, isOver, id]);

  const isParent = useMemo(() => {
    const matchedData = useStudioDataStore.getState().data.find((item) => item.id === id);
    if (matchedData && matchedData.children.length > 0) {
      return !!matchedData.children.find((item) => item.id === active?.id);
    }

    return false;
  }, [id, active?.id]);

  const isShowDropMask = useMemo(() => {
    return !isParent && !isSelf && isOver;
  }, [isSelf, isOver, isParent]);

  const extendedStyle = useMemo(() => {
    if (isShowDropMask) {
      return {
        zIndex: 2,
      };
    }

    return {};
  }, [isShowDropMask]);

  return (
    <div
      className={cx('droppable-node', className)}
      ref={setNodeRef}
      style={{
        width: '100%',
        // height: 'calc(100% + 42px)',
        minHeight: '100%',
        // transform: 'translateX(-50%)',
        ...extendedStyle,
      }}
      {...props}
    >
      <div className="droppable-node__container">
        {children}
        {/* {isShowDropMask && <Lego background="rgba(0,0,0, 0.1)" />} */}
      </div>
      {isShowDropMask && <div className="droppable-node__mask">{draggingElement}</div>}
    </div>
  );
};

export default Package;
