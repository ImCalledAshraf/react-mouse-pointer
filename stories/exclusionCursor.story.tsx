import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import {  text, withKnobs } from '@storybook/addon-knobs';

export const Docs = () => (
  <ShowDocs md={require('../docs/exclusionCursor.md')} />
);
export const Demo = () => {
  const exclusionBackgroundColor = text('exclusionBackgroundColor', '#c5ded8');
  const cursorExclusionBackgroundColor = text('<CursorStyle>exclusionBackgroundColor', '#c5ded8');

  const demoComponent = () => {
  return (
    <body style={{ height: '95vh' }}>
      <Cursor isGelly={true}
              cursorSize={60}
              exclusionBackgroundColor={exclusionBackgroundColor}

      />
      <CursorStyle
        exclusion={true}
        exclusionBackgroundColor={cursorExclusionBackgroundColor}

      >

      <div
        style={{
          borderRadius: '20px',
          background: '#c5ded8',
          padding: '2em',
          display: 'grid',
          placeItems: 'center'

        }}
      >
        <h1 style={{ margin: '0' }} id='stick-title'>Cursor Exclusion Effect</h1>
        <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
        <p style={{ margin: '0' }}>Wrapped with :</p>
        <p></p>
        <div style={{textAlign:'center'}}>

          <p style={{ margin: '0' }}>
            <b> &lt;CursorStyle </b> <br /> exclusion
            = &#123;true&#125; <br />
            {/*----*/}
            exclusionBackgroundColor
            = &#123;'{cursorExclusionBackgroundColor}'&#125;
            {/*----*/}


            <b> &#62; <br /> &lt;/CursorStyle&gt;</b>
          </p>

        </div>
      </div>
      </CursorStyle>


    </body>
  );
};
return demoComponent();
};

export default {
  title: 'Cursor/Exclusion',
  decorators: [withKnobs],
};

