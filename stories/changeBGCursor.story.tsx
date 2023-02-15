import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { number, text, withKnobs } from '@storybook/addon-knobs';


export const Docs = () => (
  <ShowDocs md={require('../docs/changeBackgroundCursor.md')} />
);
export const Demo = () => {
  // const cursorSize = number('Cursor Size', 30);
  const backgroundImageAnimationDuration = number('backgroundImageAnimationDuration', 0);
  const cusorBackgroundImage = text('data-cursor-background-imag', '/images/image-tv.png');
  const cursorBorderRadiusOnHover = text('data-cursor-border-radius', '100%');
  const cursorSizeOnHover = text('data-cursor-size', '200px');
  const cursorOutlineWidthOnHover = text('data-cursor-outline-width', '0');
  const backgroundImageScale = text('data-cursor-background-image-scale', '1');
  const demoComponent = () => {
    return (
      <div style={{ height: '95vh' }}>
        <Cursor
          isGelly={true}
          backgroundImageAnimationDuration={backgroundImageAnimationDuration}
        />
        <div
          style={{
            borderRadius: '20px',
            outline: '2px solid orange',
            padding: '2em',
            display: 'grid',
            placeItems: 'center'
          }}
          data-cursor-background-image={cusorBackgroundImage}
          data-cursor-background-image-scale={backgroundImageScale}
          data-cursor-border-radius={cursorBorderRadiusOnHover}
          data-cursor-size={cursorSizeOnHover}
          data-cursor-outline-width={cursorOutlineWidthOnHover}
        >
          <h1 id='stick-title'>Hover to Change Cursor's Background Image</h1>
        </div>
      </div>
    );
  };
  return demoComponent();
};


export default {
  title: 'Cursor/Background',
  decorators: [withKnobs],
};
