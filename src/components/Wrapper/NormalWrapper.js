import React from 'react';
import { css } from '@emotion/css';

const NormalWrapper = ({ children }) => (
  <div
    className={css`
      width: 100vw;
      margin-left: auto;
      margin-right: auto;
    `}
  >
    {children}
  </div>
);

export default NormalWrapper;
