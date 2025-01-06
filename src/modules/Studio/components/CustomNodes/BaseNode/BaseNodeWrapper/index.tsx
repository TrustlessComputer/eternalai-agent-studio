import React from 'react';

import './BaseNodeWrapper.scss';
import TextRender from '../../../Render/TextRender';

import { StudioCategoryOption } from '@/modules/Studio/types/category';

type Props = {
  children: React.ReactNode;
  option: StudioCategoryOption;
};
function BaseNodeWrapper({ option, children }: Props) {
  if (option?.boxWrapper) {
    if (option.boxWrapper.title) {
      return (
        <div className="studio-base-node-wrapper">
          <div className="studio-base-node-wrapper__title">
            <TextRender data={option.boxWrapper.title} />
          </div>
          <div className="studio-base-node-wrapper__content">{children}</div>
        </div>
      );
    }

    if (option.boxWrapper.render) {
      return option.boxWrapper.render(children, option);
    }
  }

  return <>{children}</>;
}

export default BaseNodeWrapper;
