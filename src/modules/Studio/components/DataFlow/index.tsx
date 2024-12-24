import useStudioDataStore from 'modules/Studio/stores/useStudioDataStore';
import { StudioDataNode } from 'modules/Studio/types/graph';
import { useEffect } from 'react';

function DataFlow({ onChange }: { onChange?: (data: StudioDataNode[]) => void }) {
  const { data } = useStudioDataStore();

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data, onChange]);

  return <></>;
}

export default DataFlow;
