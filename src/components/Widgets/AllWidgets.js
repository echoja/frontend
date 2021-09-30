import React from 'react';
import Cookies from 'js-cookie';
import { css } from '@emotion/css';
import { YoutubeVideo, Image } from '..';
import GridLayout from '../GridLayout/GridLayout';

const layout_info = [
  {
    i: '0',
    x: 1,
    y: 1,
    w: 2,
    h: 3,
    type: 'image',
    source: 'url',
  },
  { i: '1', x: 2, y: 4, w: 2, h: 3 },
  { i: '2', x: 10, y: 4, w: 2, h: 4 },
];

function AllWidgets(props) {
  const video = <YoutubeVideo embedId={Cookies.get('video')} />;
  const image = <Image src={Cookies.get('image')} />;
  const staticLayout = layout_info.map((info) => ({ ...info, static: true }));
  return (
    <div style={{ position: 'relative' }}>
      <GridLayout
        onLayoutChange={(layout) => {
          console.log(layout);
        }}
        mylayout={staticLayout}
        className={css`
          margin: 0 auto;
          width: 100%;
          z-index: 2;
        `}
      />
    </div>
  );
}

export default AllWidgets;