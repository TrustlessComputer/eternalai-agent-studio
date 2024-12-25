import { useEffect } from 'react';

import useStudioDataStore from '../../stores/useStudioDataStore';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import { StudioDataNode } from '../../types/graph';

import { useThrottleValue } from '@/hooks/useThrottleValue';

function DataFlow({ onChange }: { onChange?: (data: StudioDataNode[]) => void }) {
  const { data } = useStudioDataStore();
  const nodes = useStudioFlowStore((state) => state.nodes);

  const throttleNodes = useThrottleValue(nodes, 1000);

  useEffect(() => {
    // sync nodes with data
    console.log('throttleNodes', throttleNodes);
  }, [throttleNodes]);

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data, onChange]);

  return <></>;
}

export default DataFlow;
