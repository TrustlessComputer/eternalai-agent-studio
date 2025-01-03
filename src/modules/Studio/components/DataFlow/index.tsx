import { useThrottleValue } from '@/hooks/useThrottleValue';
import { useEffect } from 'react';
import useStudioCategoryStore from '../../stores/useStudioCategoryStore';
import useStudioDataStore from '../../stores/useStudioDataStore';
import useStudioDndStore from '../../stores/useStudioDndStore';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import useStudioFormStore from '../../stores/useStudioFormStore';
import { StudioNode, StudioCategoryOptionMapValue, StudioDataNode } from '../../types';

function Listen() {
  const nodes = useStudioFlowStore((state) => state.nodes);
  const formMap = useStudioFormStore((state) => state.formMap);
  const draggingData = useStudioDndStore((state) => state.draggingData);

  const isDragging = !!draggingData;

  const throttleNodes = useThrottleValue(nodes, 1000);
  const throttleDataForms = useThrottleValue(formMap, 500);

  useEffect(() => {
    // sync nodes with data

    if (!isDragging) {
      const usedKeyCollection: Record<string, string> = {};
      const categoryOptionMap = useStudioCategoryStore.getState().categoryOptionMap;

      const getChildrenDataFromChildren = (children: StudioNode[]) => {
        return children
          .map((child) => {
            const id = child.data.id;
            const metadata = child.data.metadata;
            const idx = child.data.metadata.idx;
            const option: StudioCategoryOptionMapValue | undefined = categoryOptionMap[idx];

            if (metadata) {
              const formValue = throttleDataForms[id] || {};

              if (option?.parent?.idx) {
                usedKeyCollection[option.parent.idx] = option.parent.idx;
              }

              usedKeyCollection[option.idx] = option.idx;

              return {
                id,
                idx,
                title: option.title || 'Untitled',
                children: [],
                data: {
                  ...formValue,
                },
                rect: {
                  position: child.position,
                },
              };
            }

            return null;
          })
          .filter((item) => !!item) as StudioDataNode[];
      };

      const newData: StudioDataNode[] = [];

      throttleNodes.forEach((node) => {
        const metadata = node.data.metadata;
        const id = node.data.id;
        const idx = node.data.metadata.idx;
        const option: StudioCategoryOptionMapValue | undefined = categoryOptionMap[idx];

        if (metadata) {
          const children = getChildrenDataFromChildren(metadata?.children);
          const formValue = throttleDataForms[id] || {};

          if (option?.parent?.idx) {
            usedKeyCollection[option.parent.idx] = option.parent.idx;
          }

          usedKeyCollection[option.idx] = option.idx;
          newData.push({
            id,
            idx: option.idx,
            title: option.title || 'Untitled',
            children,
            data: {
              ...formValue,
            },
            rect: {
              position: node.position,
            },
          });
        }
      });

      useStudioDataStore.getState().setData(newData);
      useStudioCategoryStore.getState().setUsedKeyCollection(usedKeyCollection);
    }
  }, [throttleNodes, throttleDataForms, isDragging]);

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

function DataSync() {
  const entry = useStudioDataStore((state) => state.entry);
  const data = useStudioDataStore((state) => state.data);
  const rootCategory = useStudioCategoryStore((state) => state.rootCategory);

  useEffect(() => {
    if (!entry) {
      if (rootCategory) {
        const rootOptions = rootCategory.options as StudioCategoryOptionMapValue[];
        const rootOptionsKey = rootOptions.map((item) => item.idx);
        const newEntry = data?.find((item) => item.idx === rootCategory.idx || rootOptionsKey.includes(item.idx));

        if (newEntry) {
          // set entry
          useStudioDataStore.getState().setEntry(newEntry);
          useStudioCategoryStore.getState().updateCategoriesForEntry(newEntry);
        } else {
          useStudioCategoryStore.getState().updateCategoriesForEntry(null);
        }
      }
    } else {
      const existEntry = data.find((item) => item.id === entry.id);
      if (!existEntry) {
        // remove entry
        useStudioDataStore.getState().setEntry(null);
        useStudioCategoryStore.getState().updateCategoriesForEntry(null);
      }
    }
    // useStudioCategoryStore.getState().updateCategoriesForEntry(entry);
  }, [entry, data, rootCategory]);

  return <></>;
}

function DataFlow({ onChange }: { onChange?: (data: StudioDataNode[]) => void }) {
  return (
    <>
      <Listen />
      <Publish onChange={onChange} />
      <DataSync />
    </>
  );
}

export default DataFlow;
