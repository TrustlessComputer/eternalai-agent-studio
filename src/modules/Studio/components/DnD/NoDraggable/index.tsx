import './NoDraggable.scss';
import cs from 'classnames';

function NoDraggable({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cs('studio-no-draggable', className)}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

export default NoDraggable;
