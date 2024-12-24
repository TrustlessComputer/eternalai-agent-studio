import React, { FunctionComponent } from 'react';

type Props = {
  data: React.ReactNode | FunctionComponent;
};

function ImageRender({ data }: Props) {
  if (typeof data === 'string') {
    return <img src={data} alt="Image" />;
  }

  if (typeof data === 'function') {
    return data({});
  }

  return data;
}

export default ImageRender;
