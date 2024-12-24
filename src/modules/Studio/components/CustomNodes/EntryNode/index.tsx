import { NodeProps } from '@xyflow/react';

import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import BaseNode from '../BaseNode';

import { StudioNode } from '@/modules/Studio/types/graph';

type Props = NodeProps<StudioNode>;

const EntryNode = ({ data }: Props) => {
  return (
    <BaseNode actions={[]}>
      <Lego>
        <LegoContent>
          <p>Agent name</p>
        </LegoContent>
      </Lego>
    </BaseNode>
  );
};

export default EntryNode;
