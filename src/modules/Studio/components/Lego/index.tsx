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

  fixedHeight?: boolean;

  title?: React.ReactNode | FunctionComponent;
};

const FixedLego = ({
  background = '#A041FF',
  disabled = false,
  icon,
  className,
  children,
  borderColor,
  ...props
}: Omit<Props, 'fixedHeight'> & {
  borderColor: string;
}) => {
  return (
    <div
      {...props}
      className={cx('lego', className, {
        'lego--disabled': disabled,
      })}
      style={
        {
          '--border-color': borderColor,
          '--background-color': background,
        } as CSSProperties
      }
    >
      <div className="lego__stud">
        <StudIcon />
      </div>

      <div className="lego__body">
        <div className="lego__icon">
          <ImageRender data={icon} />
        </div>

        <div className="lego__content">{children}</div>
      </div>
    </div>
  );
};

const DynamicLego = ({
  children,
  icon,
  background,
  borderColor,
  ...props
}: Omit<Props, 'fixedHeight'> & {
  borderColor: string;
}) => {
  return (
    <div
      className="studio-lego-dynamic"
      style={
        {
          '--border-color': borderColor,
          '--background-color': background,
        } as CSSProperties
      }
    >
      <div className="studio-lego-dynamic__top">
        <FixedLego {...props} icon={null} background={background} borderColor={borderColor} />
      </div>
      <div className="studio-lego-dynamic__body">
        <div>
          <ImageRender data={icon} />
        </div>
        <div>{children}</div>
      </div>
      <div className="studio-lego-dynamic__bottom">
        <FixedLego {...props} icon={null} background={background} borderColor={borderColor} />
      </div>
    </div>
  );
};

const Lego = ({ fixedHeight = true, background = '#A041FF', ...props }: Props) => {
  const borderColor = useMemo(() => adjustColorShade(background, -20), [background]);
  if (fixedHeight) {
    return <FixedLego background={background} borderColor={borderColor} {...props} />;
  }

  return <DynamicLego background={background} borderColor={borderColor} {...props} />;
};

export default memo(Lego);
