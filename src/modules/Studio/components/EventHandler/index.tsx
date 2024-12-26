import useContainerMouse from '@/hooks/useContainerMouse';
import useStudioFlowViewStore from '@/modules/Studio/stores/useStudioFlowViewStore';
import { XYPosition } from '@xyflow/react';
import { useCallback, useEffect, useRef } from 'react';

type Props = React.ComponentPropsWithoutRef<'div'>;

function EventHandler({ children, ...rest }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  const setMousePosition = useStudioFlowViewStore((state) => state.setMousePosition);

  const handleOnTick = useCallback(
    (_contentRect: DOMRect, mousePosition: XYPosition, _previousMousePosition: XYPosition) => {
      setMousePosition(mousePosition);
    },
    [],
  );

  const { addListeners, removeListeners } = useContainerMouse({
    ref: contentRef,
    handleOnTick,
  });

  useEffect(() => {
    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

  return (
    <div {...rest} ref={contentRef}>
      {children}
    </div>
  );
}

export default EventHandler;
