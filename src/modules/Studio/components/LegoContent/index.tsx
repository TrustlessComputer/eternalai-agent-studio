import cs from 'clsx';
import { HTMLAttributes } from 'react';
import './styles.scss';

type Props = HTMLAttributes<HTMLDivElement>;

const AgentStudioLegoContent = ({ children, className, ...props }: Props) => {
  return (
    <div className={cs('lego-content', className)} {...props}>
      {children}
    </div>
  );
};

export default AgentStudioLegoContent;
