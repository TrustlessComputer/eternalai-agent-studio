import cx from 'clsx';
import { memo } from 'react';
import './Overlay.scss';

type Props = {
  active: boolean;
};

const Overlay = ({ active }: Props) => {
  return <div className={cx('overlay', { 'overlay__active': active })}></div>;
};

export default memo(Overlay);
