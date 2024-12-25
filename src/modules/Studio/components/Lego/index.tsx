import cx from 'clsx';
import { CSSProperties, FunctionComponent, HTMLAttributes, memo, useMemo } from 'react';

import { adjustColorShade } from '../../utils/ui';
import './Lego.scss';

import { StudIcon } from '../icons/lego';
import ImageRender from '../Render/ImageRender';

type Props = HTMLAttributes<HTMLDivElement> & {
  background?: string; // HEX color
  disabled?: boolean;

  icon?: React.ReactNode | FunctionComponent;
  actions?: React.ReactNode;
};

const Lego = ({ background = '#A041FF', disabled = false, icon, actions, className, children, ...props }: Props) => {
  const borderColor = useMemo(() => adjustColorShade(background, -20), [background]);

  return (
    <div
      {...props}
      className={cx('lego', className, {
        'lego__disabled': disabled,
      })}
      style={
        {
          '--border-color': borderColor,
          '--background-color': background,
        } as CSSProperties
      }
    >
      <div className="lego_stud">
        <StudIcon />
      </div>

      <div className="lego_body">
        <div className="lego_icon">
          <ImageRender data={icon} />
        </div>

        <div className="lego_content">{children}</div>
      </div>

      <div className="lego_actions">{actions}</div>
    </div>
  );
};

export default memo(Lego);
