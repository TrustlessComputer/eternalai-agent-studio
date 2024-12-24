import { NodeProps } from '@xyflow/react';

import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import BaseNode from '../BaseNode';

import { StudioNode } from '@/modules/Studio/types/graph';

type Props = NodeProps<StudioNode>;

const PieceNode = ({ data }: Props) => {
  return (
    <BaseNode actions={[]}>
      <Lego>
        <LegoContent>
          <p>Lego</p>
        </LegoContent>
      </Lego>
    </BaseNode>
  );
};

export default PieceNode;
