import { useEffect } from 'react';

import useStudioDataStore from '../../stores/useStudioDataStore';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import { StudioDataNode } from '../../types/graph';

import { useThrottleValue } from '@/hooks/useThrottleValue';

function Listen() {
  const nodes = useStudioFlowStore((state) => state.nodes);

  const throttleNodes = useThrottleValue(nodes, 1000);

  useEffect(() => {
    // sync nodes with data
    console.log('throttleNodes', throttleNodes);
    // const currentData = useStudioDataStore.getState().data;
  }, [throttleNodes]);

  return <></>;
}

function Publish({ onChange }: { onChange?: (data: StudioDataNode[]) => void }) {
  const { data } = useStudioDataStore();

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data, onChange]);

  return <></>;
}

function DataFlow({ onChange }: { onChange?: (data: StudioDataNode[]) => void }) {
  return (
    <>
      <Listen />
      <Publish onChange={onChange} />
    </>
  );
}

export default DataFlow;
