import BaseNodeSingleItem from './BaseNodeSingleItem';
import { BaseNodeProps } from './types';
import BaseNodeStacks from './BaseNodeStacks';

type Props = BaseNodeProps;

export default function BaseNode(props: Props) {
  const { data } = props;
  const children = data?.metadata?.children;

  if (children.length) {
    return <BaseNodeStacks {...props} />;
  }

  return <BaseNodeSingleItem {...props} />;
}
