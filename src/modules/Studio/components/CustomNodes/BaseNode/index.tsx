import BaseNodeSingleItem from './BaseNodeSingleItem';
import BaseNodeStacks from './BaseNodeStacks';
import { BaseNodeProps } from './types';

type Props = BaseNodeProps;

export default function BaseNode(props: Props) {
  const { data } = props;
  const children = data?.metadata?.children;

  if (children.length) {
    return <BaseNodeStacks {...props} />;
  }

  return <BaseNodeSingleItem {...props} />;
}
