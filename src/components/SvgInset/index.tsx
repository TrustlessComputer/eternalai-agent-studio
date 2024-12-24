import { CSSProperties, FC } from 'react';
import { ReactSVG } from 'react-svg';

import px2rem from '../../utils/px2rem';

type Props = {
  src: string;
  size?: number;
  height?: number;
  fullWidth?: boolean;
  style?: CSSProperties;
  className?: string;
};

const SvgInset: FC<Props> = ({ size, height, fullWidth = false, ...props }) => {
  return (
    <ReactSVG
      {...props}
      beforeInjection={(svg): void => {
        if (size) {
          svg.setAttribute('height', `100%`);
          svg.setAttribute('width', `${fullWidth ? '100%' : px2rem(size)}`);
          svg.style.maxWidth = `${size}`;
          svg.style.minHeight = `100%`;
          svg.style.width = `${fullWidth ? '100%' : px2rem(size)}`;
          svg.style.height = height ? px2rem(height) : `100%`;
        }
      }}
    />
  );
};

export default SvgInset;
