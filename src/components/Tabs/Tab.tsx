import cx from 'clsx';
import { FC, PropsWithChildren } from 'react';

import { useTab } from './context';
import './Tab.scss';

export const Tab: FC<PropsWithChildren<{ id?: string }>> = ({ children, id }) => {
  const tabAttributes = useTab();

  return (
    <div {...tabAttributes} id={id} className={cx('tab', { 'tab__active': tabAttributes['aria-selected'] })}>
      {children}
    </div>
  );
};
