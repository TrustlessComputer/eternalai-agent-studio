import { XYPosition } from '@xyflow/react';
import { useCallback, useEffect, useRef } from 'react';
import useContainerMouse from '../../hooks/useContainerMouse';
import useStudioFlowViewStore from '../../stores/useStudioFlowViewStore';

type Props = React.ComponentPropsWithoutRef<'div'>;

function EventHandler({ children, ...rest }: Props) {
  const rightContentRef = useRef<HTMLDivElement>(null);

  const setMousePosition = useStudioFlowViewStore((state) => state.setMousePosition);

  const handleOnTick = useCallback(
    (contentRect: DOMRect, mousePosition: XYPosition, previousMousePosition: XYPosition) => {
      setMousePosition(mousePosition);
    },
    [],
  );

  const { addListeners, removeListeners } = useContainerMouse({
    ref: rightContentRef,
    handleOnTick,
  });

  useEffect(() => {
    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

  return (
    <div {...rest} ref={rightContentRef}>
      {children}
    </div>
  );
}

export default EventHandler;
