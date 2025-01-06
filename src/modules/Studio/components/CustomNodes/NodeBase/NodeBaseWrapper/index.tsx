import React from 'react';

import './NodeBaseWrapper.scss';
import TextRender from '../../../Render/TextRender';

import { StudioCategoryOption } from '@/modules/Studio/types/category';

type Props = {
  children: React.ReactNode;
  option: StudioCategoryOption;
};

function NodeBaseWrapper({ option, children }: Props) {
  if (option?.boxWrapper) {
    if (option.boxWrapper.render) {
      return option.boxWrapper.render(children, option);
    }

    if (option.boxWrapper.title) {
      return (
        <div className="node-base-wrapper">
          <div className="node-base-wrapper__title">
            <TextRender data={option.boxWrapper.title} />
          </div>
          <div className="node-base-wrapper__content">{children}</div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

export default NodeBaseWrapper;
