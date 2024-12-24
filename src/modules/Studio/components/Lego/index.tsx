import cx from 'clsx';
import { CSSProperties, HTMLAttributes, memo, useMemo } from 'react';

import './Lego.scss';

import SvgInset from '../../../../components/SvgInset';
import { adjustColorShade } from '../../utils/ui';

type Props = HTMLAttributes<HTMLDivElement> & {
  background?: string; // HEX color
  disabled?: boolean;

  icon?: React.ReactNode;
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
        <SvgInset src="/svgs/stud.svg" />
      </div>

      <div className="lego_icon">{icon}</div>

      <div className="lego_content">{children}</div>

      <div className="lego_actions">{actions}</div>
    </div>
  );
};

export default memo(Lego);
