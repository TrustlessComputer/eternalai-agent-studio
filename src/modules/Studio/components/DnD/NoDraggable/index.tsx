import './NoDraggable.scss';

function NoDraggable({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="studio-no-draggable"
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
