import { useEffect } from 'react';

import useStudioDataStore from '../../stores/useStudioDataStore';
import { StudioDataNode } from '../../types/graph';
import useStudioFlowStore from '../../stores/useStudioFlowStore';

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
