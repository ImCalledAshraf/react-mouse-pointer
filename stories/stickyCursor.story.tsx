import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { withKnobs } from '@storybook/addon-knobs';

export const Docs = () => <ShowDocs md={require('../docs/stickyCursor.md')} />;

export const Demo = () => {
  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorSize={30}
          // stickAnimationAmount={}
          // stickAnimationEase={}
        />
        <CursorStyle
          isSticky={true}
          // stickAnimationEase={}
          // stickAnimationAmount={}
        >
          <div
            style={{
              borderRadius: '20px',
              background: '#c5ded8',
              padding: '2em',
              display: 'grid',
              placeItems: 'center',
            }}>
            <h1 style={{ margin: '0' }} id="stick-title">
              {' '}
              Sticky
            </h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with :</p>
            <p></p>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> isSticky = &#123;true&#125;
                <b>
                  {' '}
                  &#62; <br /> &lt;/CursorStyle&gt;
                </b>
              </p>
            </div>
          </div>
        </CursorStyle>
      </div>
    );
  };
  return demoComponent();
};

export default {
  title: 'Cursor/Sticky',
  decorators: [withKnobs],
};
