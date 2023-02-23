import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { withKnobs } from '@storybook/addon-knobs';


export const Docs = () => (
  <ShowDocs md={require('../docs/changeTransparency.md')} />
);
export const Demo = () => {

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh' }}>
        <Cursor isGelly={true} cursorSize={30}
                // cursorTransparency={}
        />
        <CursorStyle
          cursorTransparency={'100%'}
        >
          <div
            style={{
              borderRadius: '20px',
              outline: '2px solid greenyellow',
              padding: '2em',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <h1 style={{ margin: '0' }} id='stick-title'>100% Cursor Transparency</h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with <b> &lt;CursorStyle </b> cursorTransparency=&#123;'{'100%'}'&#125; <b> &#62;  &lt;/CursorStyle&gt;</b> </p>

          </div>
        </CursorStyle>
        <br />
        <br />
        <br />
        <CursorStyle
          cursorTransparency={'50%'}
        >
          <div
            style={{
              borderRadius: '20px',
              outline: '2px solid orange',
              padding: '2em',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <h1 style={{ margin: '0' }} id='stick-title'>50% Cursor Transparency</h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with <b> &lt;CursorStyle </b> cursorTransparency=&#123;'{'50%'}'&#125; <b> &#62;  &lt;/CursorStyle&gt;</b> </p>

          </div>
        </CursorStyle>
        <br />
        <br />
        <br />
        <CursorStyle
          cursorTransparency={'0%'}
        >
          <div
            style={{
              borderRadius: '20px',
              outline: '2px solid red',
              padding: '2em',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <h1 style={{ margin: '0' }} id='stick-title'>0% Cursor Transparency</h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with <b> &lt;CursorStyle </b> cursorTransparency=&#123;'{'0%'}'&#125; <b> &#62;  &lt;/CursorStyle&gt;</b> </p>

          </div>
        </CursorStyle>
      </div>
    );
  };
  return demoComponent();
};

export default {
  title: 'Cursor/Transparency',
  decorators: [withKnobs],
};
