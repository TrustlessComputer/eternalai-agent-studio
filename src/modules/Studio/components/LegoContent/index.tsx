import cn from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './styles.module.scss';

type Props = HTMLAttributes<HTMLDivElement>;

const AgentStudioLegoContent = ({ children, className, ...props }: Props) => {
  return (
    <div className={cn(styles.content, className)} {...props}>
      {children}
    </div>
  );
};

export default AgentStudioLegoContent;
