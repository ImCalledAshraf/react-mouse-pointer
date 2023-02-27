// import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';

import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

export const Docs = () => <ShowDocs md={require('../docs/changeSizeCursor.md')} />;

export const Demo = () => {
  const isGelly = boolean('isGelly', false);
  const cursorSize = number('Cursor Size', 30);
  const cursorOutlineWidth = text('Cursor Outline Width', '2px');
  const sizeAnimationDuration = number('Size Animation Duration', 0.5);
  const cursorOutlineWidthOnHover = text('<CursorStyle>Cursor Outline Width On Hover', '4px');
  const cursorSizeOnHover = number('<CursorStyle>Cursor Size On Hover', 80);

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh' }}>
        <Cursor
          isGelly={true}
          cursorSize={cursorSize}
          cursorOutlineWidth={cursorOutlineWidth}
          sizeAnimationDuration={sizeAnimationDuration}
          // cursorBorderRadius={'5'}

          // sizeAnimationEase={}
        />
        <CursorStyle
          cursorSize={cursorSizeOnHover}
          cursorOutlineWidth={cursorOutlineWidthOnHover}
          // cursorBorderRadius={'0'}
          // sizeAnimationDuration={}
        >
          <div
            // data-cursor-size={cursorSizeOnHover}
            // data-cursor-outline-width={cursorOutlineWidthOnHover}
            style={{
              borderRadius: '20px',
              background: '#E0EFEA',
              // outline: '2px solid orange',
              padding: '2em',
              display: 'grid',
              placeItems: 'center',
            }}>
            <h1 style={{ margin: '0' }} id="stick-title">
              Change Cursor Size
            </h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>
              Wrapped with <b> &lt;CursorStyle </b> cursorSize=&#123;{cursorSizeOnHover}&#125;&#62;
              cursorOutlineWidth=&#123;{cursorOutlineWidthOnHover}
              <b> &#125;&#62; &lt;/CursorStyle&gt;</b>{' '}
            </p>
          </div>
        </CursorStyle>
      </div>
    );
  };
  return demoComponent();
};
export default {
  title: 'Cursor/Size',
  decorators: [withKnobs],
};
