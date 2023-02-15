import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { number, text, withKnobs } from '@storybook/addon-knobs';


export const Docs = () => (
  <ShowDocs md={require('../docs/textCursor.md')} />
);


export const Demo = () => {
  const demoComponent = () => {
    const cursorSize = number('Cursor Size', 30);
    let cursorBackgroundColorOnHover = text('data-cursor-background-color', 'black');
    let cursorText = text('data-cursor-text', 'text');
    let cursorTextColor = text('data-cursor-text-color', 'white');
    let cursorTextScale = text('data-cursor-text-scale', '2');
    let cursorSizeOnHover = text('data-cursor-size', '100px');

    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorSize={cursorSize}
        />
        <div
          style={{
            borderRadius : '20px',
            background: '#c5ded8',
            padding: '2em',
            display: 'grid',
            placeItems: 'center'
          }}
          data-cursor-background-color={cursorBackgroundColorOnHover}
          data-cursor-text={cursorText}
          data-cursor-text-color={cursorTextColor}
          data-cursor-text-scale={cursorTextScale}
          data-cursor-size={cursorSizeOnHover}>
          <h1 style={{ margin: '0' }} id='stick-title'>Cursor Text</h1>
          <h3 style={{ margin: '0' }}>Hover To see Effect</h3></div>
      </div>
    );
  };
  return demoComponent()
}

export default {
  title: 'Cursor/Text',
  decorators: [withKnobs],
};
