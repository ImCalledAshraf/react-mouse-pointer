import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';
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
  const cursorOutlineWidth = text('Cursor Outline Width', '6px');
  const cursorOutlineColor = text('Cursor Outline Color', 'red');
  const cursorOutlineColorOnHover = text('<CursorStyle>Cursor Outline Color On Hover', 'green');
  const cursorBackgroundColor = text('Cursor Background Color', 'greenyellow');
  const cursorBackgroundColorOnHover = text('<CursorStyle>Cursor Background Color On Hover', 'orange');
  // const cursorOutlineWidthOnHover = text('Cursor Outline Width On Hover', '6px');
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
        <CursorStyle
          cursorBackgroundColor={cursorBackgroundColorOnHover}
        >
          <div
            style={{
              borderRadius: '20px',
              background: '#E0EFEA',
              padding: '2em',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <h1 style={{ margin: '0' }} id='stick-title'>Change Cursor Background Color</h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with <b> &lt;CursorStyle </b> cursorBackgroundColor=&#123;'{cursorBackgroundColorOnHover}'&#125;&#62; <b> &#125;&#62;  &lt;/CursorStyle&gt;</b> </p>

          </div>
        </CursorStyle>

        <br />
        <br />
        <br />
        <CursorStyle
        cursorOutlineColor={cursorOutlineColorOnHover}
        >
          <div
            style={{
              // background: 'greenyellow',
              borderRadius: '20px',
              outline: '2px solid orange',
              padding: '2em',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <h1 style={{ margin: '0' }} id='stick-title'>Change Cursor Outline Color</h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with <b> &lt;CursorStyle </b> cursorOutlineColor=&#123;'{cursorOutlineColorOnHover}'&#125;&#62; <b> &#125;&#62;  &lt;/CursorStyle&gt;</b> </p>          </div>
        </CursorStyle>
      </div>
    );
  };
  return demoComponent();
};


export default {
  title: 'Cursor/Color',
  decorators: [withKnobs],
};
