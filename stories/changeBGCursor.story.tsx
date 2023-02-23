import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';


export const Docs = () => (
  <ShowDocs md={require('../docs/changeBackgroundCursor.md')} />
);
export const Demo = () => {
  // const cursorSize = number('Cursor Size', 30);
  const isGelly = boolean('isGelly', true);
  const backgroundImageAnimationDuration = number('backgroundImageAnimationDuration', 0);
  const backgroundImageAnimationDurationOnHover = number('<CursorStyle>backgroundImageAnimationDuration', 0);
  const cusorBackgroundImage = text('<CursorStyle> data-cursor-background-imag', '/images/image-tv.png');
  const cursorBorderRadiusOnHover = text('<CursorStyle> data-cursor-border-radius', '100%');
  const cursorSizeOnHover = number('<CursorStyle>Cursor Size On Hover', 200);
  const cursorOutlineWidthOnHover = text('<CursorStyle>data-cursor-outline-width', '0');
  const backgroundImageScale = number('<CursorStyle>data-cursor-background-image-scale', 1);
  const demoComponent = () => {
    return (
      <div style={{ height: '95vh' }}>
        <Cursor
          isGelly={isGelly}
          backgroundImageAnimationDuration={backgroundImageAnimationDuration}
          // backgroundImageAnimationEase={}
        />
        <CursorStyle
          cursorBackgroundImage={cusorBackgroundImage}
          cursorBackgroundImageScale={backgroundImageScale}
          cursorBorderRadius={cursorBorderRadiusOnHover}
          cursorSize={cursorSizeOnHover}
          cursorOutlineWidth={cursorOutlineWidthOnHover}
          backgroundImageAnimationDuration={backgroundImageAnimationDurationOnHover}
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
            <h1 style={{ margin: '0' }} id='stick-title'>Change Cursor Background Image</h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with :</p>
            <p></p>
            <div style={{textAlign:'center'}}>

              <p style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> cursorBackgroundImage
                = &#123;'{cusorBackgroundImage}'&#125; <br />
                {/*----*/}
                cursorBackgroundImageScale
                = &#123;{backgroundImageScale}&#125; <br />
                {/*----*/}
                cursorBorderRadius
                = &#123;'{cursorBorderRadiusOnHover}'&#125; <br />
                {/*----*/}
                cursorSize = &#123;{cursorSizeOnHover}&#125; <br />
                {/*----*/}
                cursorOutlineWidth
                = &#123;'{cursorOutlineWidthOnHover}'&#125;<br />
                {/*----*/}
                backgroundImageAnimationDuration
                = &#123;{backgroundImageAnimationDurationOnHover}&#125;
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
  title: 'Cursor/Background',
  decorators: [withKnobs],
};
