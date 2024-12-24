import React, { FunctionComponent } from 'react';

type Props = {
  data: React.ReactNode | FunctionComponent;
};

function TextRender({ data }: Props) {
  if (typeof data === 'function') {
    return data({});
  }

  return data;
}

export default TextRender;
