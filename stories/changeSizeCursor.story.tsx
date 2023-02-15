// import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';


export const Docs = () => (
  <ShowDocs md={require('../docs/changeSizeCursor.md')} />
);

export const Demo = () => {
  const isGelly = boolean('isGelly', false);
  const cursorSize = number('Cursor Size', 30);
  const cursorOutlineWidth = text('Cursor Outline Width', '2px');
  const cursorOutlineWidthOnHover = text('Cursor Outline Width On Hover', '2px');
  const cursorSizeOnHover = number('Cursor Size On Hover', 200);
  const sizeAnimationDuration = number('Size Animation Duration', 0.5);

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh' }}>
      <Cursor
        isGelly={isGelly}
        cursorSize={cursorSize}
        cursorOutlineWidth={cursorOutlineWidth}
        sizeAnimationDuration={sizeAnimationDuration}
      />
      <div
        data-cursor-size={cursorSizeOnHover}
        data-cursor-outline-width={cursorOutlineWidthOnHover}
        style={{
          borderRadius: '20px',
          background: '#E0EFEA',
          // outline: '2px solid orange',
          padding: '2em',
          display: 'grid',
          placeItems: 'center'
        }}>
        <h1 id='stick-title'>Hover to Change Cursor's Size</h1>
      </div>
      </div>
    );
  };
  return demoComponent();
};
export default {
  title: 'Cursor/Size',
  decorators: [withKnobs],
};
