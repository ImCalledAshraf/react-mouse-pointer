import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';
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
    let cursorBackgroundColorOnHover = text('<CursorStyle>cursorBackgroundColor', 'black');
    let cursorText = text('<CursorStyle>cursorText', 'text');
    let cursorTextColor = text('<CursorStyle>cursorTextColor', 'white');
    let cursorTextScale = text('<CursorStyle>cursorTextScale', '2');
    let cursorSizeOnHover = text('<CursorStyle>cursorSize', '100px');

    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorSize={cursorSize}
          // textAnimationEase={}
          // textAnimationDuration={}

        />
        <CursorStyle
          cursorBackgroundColor={cursorBackgroundColorOnHover}
          cursorText={cursorText}
          cursorTextColor={cursorTextColor}
          cursorTextScale={cursorTextScale}
          // cursorTextOpacity={0.2}
          // textAnimationDuration={}
          // textAnimationEase={}
          cursorSize={cursorSizeOnHover}
        >

          <div
            style={{
              borderRadius: '20px',
              background: '#c5ded8',
              padding: '2em',
              // display: 'grid',
              // alignContent:'top',
              // alignItems: 'left',

            }}
          >
            <div style={{textAlign:'left'}}>

            <h1 style={{ margin: '0' }} id='stick-title'>Change Cursor BG Image</h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with :</p>
            <p></p>

              <p style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> cursorBackgroundColor
                = &#123;'{cursorBackgroundColorOnHover}'&#125; <br />
                {/*----*/}
                cursorText
                = &#123;'{cursorText}'&#125; <br />
                {/*----*/}
                cursorTextColor
                = &#123;'{cursorTextColor}'&#125; <br />
                {/*----*/}
                cursorTextScale = &#123;{cursorTextScale}&#125; <br />
                {/*----*/}
                cursorSize
                = &#123;'{cursorSizeOnHover}'&#125;
                {/*----*/}

                <b> &#62; <br /> &lt;/CursorStyle&gt;</b>
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
  title: 'Cursor/Text',
  decorators: [withKnobs],
};
