import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';


export const Docs = () => (
  <ShowDocs md={require('../docs/changeColorCursor.md')} />
);
export const Demo = () => {
  const isGelly = boolean('isGelly', false);
  const cursorSize = number('Cursor Size', 50);
  const cursorOutlineColor = text('Cursor Outline Color', 'red');
  const cursorOutlineColorOnHover = text('Cursor Outline Color On Hover', 'green');
  const cursorBackgroundColor = text('Cursor Background Color', 'greenyellow');
  const cursorBackgroundColorOnHover = text('Cursor Background Color On Hover', 'orange');
  const cursorOutlineWidth = text('Cursor Outline Width', '6px');
  const cursorOutlineWidthOnHover = text('Cursor Outline Width On Hover', '6px');
  const demoComponent = () => {
    return (
      <div style={{ height: '95vh' }}>
        <Cursor
          isGelly={isGelly}
          cursorSize={cursorSize}
          cursorBackgroundColor={cursorBackgroundColor}
          cursorOutlineColor={cursorOutlineColor}
          cursorOutlineWidth={cursorOutlineWidth}
        />
        <div data-cursor-background-color={cursorBackgroundColorOnHover}
             style={{
               borderRadius:'20px',
               background: '#E0EFEA',
               padding: '2em',
               display: 'grid',
               placeItems: 'center'
             }}
        >
          <h1 id='stick-title'>Hover to Change Cursor Background Color</h1>
        </div>
        <br />
        <br />
        <br />
        <div
          data-cursor-outline-color={cursorOutlineColorOnHover}
          data-cursor-outline-width={cursorOutlineWidthOnHover}
             style={{
               // background: 'greenyellow',
               borderRadius:'20px',
               outline: '2px solid orange',
               padding: '2em',
               display: 'grid',
               placeItems: 'center'
             }}
        >
          <h1 id='stick-title'>Hover to Change Cursor Outline Color</h1>
        </div>
      </div>
    );
  };
  return demoComponent();
};


export default {
  title: 'Cursor/Color',
  decorators: [withKnobs],
};
