import { useEffect } from 'react';

import useStudioDataStore from '../../stores/useStudioDataStore';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import { StudioDataNode } from '../../types/graph';

import { useThrottleValue } from '@/hooks/useThrottleValue';
import useStudioFormStore from '../../stores/useStudioFormStore';

function Listen() {
  const nodes = useStudioFlowStore((state) => state.nodes);
  const dataForms = useStudioFormStore((state) => state.dataForms);

  const throttleNodes = useThrottleValue(nodes, 1000);
  const throttleDataForms = useThrottleValue(dataForms, 500);

  useEffect(() => {
    // sync nodes with data
    const newData: StudioDataNode[] = [];
    throttleNodes.forEach((node) => {
      const metadata = node.data.metadata;
      if (metadata) {
        const formValue = throttleDataForms[metadata.nodeId] || {};
        newData.push({
          id: metadata.nodeId,
          keyMapper: metadata.option.keyMapper,
          title: metadata.option.title || 'Untitled',
          children: [],
          data: {
            ...formValue,
          },
          rect: {
            position: node.position,
          },
        });
      }
    });
    console.log('___________sync nodes with data', { newData, throttleNodes });
    useStudioDataStore.getState().setData(newData);
  }, [throttleNodes, throttleDataForms]);

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
