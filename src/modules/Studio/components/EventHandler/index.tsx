import { useCallback, useEffect, useRef } from 'react';
import useStudioFlowViewStore from '../../stores/useStudioFlowViewStore';
import useContainerMouse from '../../hooks/useContainerMouse';

type Props = React.ComponentPropsWithoutRef<'div'>;

function EventHandler({ children, ...rest }: Props) {
  const rightContentRef = useRef<HTMLDivElement>(null);

  const setMousePosition = useStudioFlowViewStore((state) => state.setMousePosition);

  const handleOnTick = useCallback(
    (
      contentRect: DOMRect,
      mousePosition: { x: number; y: number },
      previousMousePosition: { x: number; y: number },
    ) => {
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