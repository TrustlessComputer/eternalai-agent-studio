import React from 'react';
import './BaseNodeWrapper.scss';

function BaseNodeWrapper({ children }: { children: React.ReactNode }) {
  return <div className="studio-base-node-wrapper">{children}</div>;
}

export default BaseNodeWrapper;
