import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import './public/tiltStyle.css';

export const Docs = () => <ShowDocs md={require('../docs/tiltElements.md')} />;
export const Demo = () => {
  const cursorTiltAmount = number('<CursorStyle>tiltAmount', 0.05);
  const cursorTiltDuration = number('<CursorStyle>tiltDuration', 1.02);
  // const cursorFloatFollow = boolean('data-cursor-tilt-follow', true);
  const elementTiltTriggerOffset = text('<CursorStyle>tiltTriggerOffset', 'example : 20');
  // const elementFloatSpringToPosition = boolean('elementFloatSpringToPosition', false);

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorTransparency={'100'}
          cursorSize={30}
          // tiltAmount={}
          // tiltAnimationDuration={}
          // tiltAnimationEase={}
        />
        <CursorStyle
          tilt={true}
          tiltAmount={cursorTiltAmount}
          tiltTriggerOffset={elementTiltTriggerOffset}
          tiltAnimationDuration={cursorTiltDuration}
          // tiltAnimationEase={}
        >
          <div id="cube-container">
            <div className="face top"></div>
            <div className="face right"></div>
            <div className="face bottom"></div>
            <div className="face left"></div>
            <div className="face back">
              <h1 style={{ margin: '0' }} id="stick-title">
                Tilt Element
              </h1>
              <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
              <p style={{ margin: '0' }}>Wrapped with :</p>
              <p></p>
              <div style={{ textAlign: 'left', padding: '20px' }}>
                <p style={{ margin: '0' }}>
                  <b> &lt;CursorStyle </b> <br /> tilt = &#123;true&#125; <br />
                  {/*----*/}
                  tiltAmount = &#123;{cursorTiltAmount}&#125; <br />
                  {/*----*/}
                  tiltDuration = &#123;{cursorTiltDuration}&#125; <br />
                  {/*----*/}
                  tiltTriggerOffset = &#123;'{elementTiltTriggerOffset}'&#125;
                  {/*----*/}
                  <b>
                    {' '}
                    &#62; <br /> &lt;/CursorStyle&gt;
                  </b>
                </p>
              </div>
            </div>
          </div>
        </CursorStyle>
      </div>
    );
  };
  return demoComponent();
};
export default {
  title: 'Cursor/Tilting Elements',
  decorators: [withKnobs],
};
