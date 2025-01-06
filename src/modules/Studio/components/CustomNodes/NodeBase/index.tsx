import NodeSingle from './NodeSingle';
import NodeStacks from './NodeStacks';
import { BaseNodeProps } from './types';
import './NodeBase.scss';

type Props = BaseNodeProps;

export default function NodeBase(props: Props) {
  const { data } = props;
  const children = data?.metadata?.children;

  if (children.length) {
    return <NodeStacks {...props} />;
  }

  return <NodeSingle {...props} />;
}
