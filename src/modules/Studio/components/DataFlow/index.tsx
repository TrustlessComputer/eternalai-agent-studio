import { useEffect } from 'react';

import useStudioDataStore from '../../stores/useStudioDataStore';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import { StudioDataNode, StudioNode } from '../../types/graph';

import { useThrottleValue } from '@/hooks/useThrottleValue';
import useStudioCategoryStore from '../../stores/useStudioCategoryStore';
import useStudioFormStore from '../../stores/useStudioFormStore';
import { StudioCategoryMap } from '../../types/category';
import useStudioDndStore from '../../stores/useStudioDndStore';

function Listen() {
  const nodes = useStudioFlowStore((state) => state.nodes);
  const dataForms = useStudioFormStore((state) => state.dataForms);
  const draggingData = useStudioDndStore((state) => state.draggingData);

  const isDragging = !!draggingData;

  const throttleNodes = useThrottleValue(nodes, 1000);
  const throttleDataForms = useThrottleValue(dataForms, 500);

  useEffect(() => {
    // console.log('___________throttleNodes', { throttleNodes, throttleDataForms });
    // sync nodes with data

    if (!isDragging) {
      const usedKeyCollection: Record<string, string> = {};
      const categoryMap = useStudioCategoryStore.getState().categoryMap;
      const getChildrenDataFromChildren = (children: StudioNode[]) => {
        return children
          .map((child) => {
            const id = child.data.id;
            const metadata = child.data.metadata;
            const key = child.data.metadata.key;
            const option = categoryMap[key] as StudioCategoryMap;

            // const id = data.id;
            if (metadata) {
              const formValue = throttleDataForms[id] || {};

              if (option?.parent?.key) {
                usedKeyCollection[option.parent.key] = option.parent.key;
              }

              usedKeyCollection[option.key] = option.key;

              return {
                id,
                key,
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
        const key = node.data.metadata.key;
        const option = categoryMap[key] as StudioCategoryMap;
        if (metadata) {
          const children = getChildrenDataFromChildren(metadata?.children);
          const formValue = throttleDataForms[id] || {};

          if (option?.parent?.key) {
            usedKeyCollection[option.parent.key] = option.parent.key;
          }

          usedKeyCollection[option.key] = option.key;
          newData.push({
            id,
            key: option.key,
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
      // console.log('___________sync nodes with data', { newData, throttleNodes });
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
        const rootOptions = rootCategory.options as StudioCategoryMap[];
        const rootOptionsKeyMapper = rootOptions.map((item) => item.key);
        const newEntry = data?.find((item) => item.key === rootCategory.key || rootOptionsKeyMapper.includes(item.key));
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
