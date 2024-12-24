import { useEffect } from 'react';

import useStudioDataStore from '../../stores/useStudioDataStore';
import { StudioDataNode } from '../../types/graph';

function DataFlow({ onChange }: { onChange?: (data: StudioDataNode[]) => void }) {
  const { data } = useStudioDataStore();

  useEffect(() => {
    if (data) {
      // generate nodes/edges from data
    }
  }, [data]);

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data, onChange]);

  return <></>;
}

export default DataFlow;
