import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { useEffect } from 'react';

export const Docs = () => <ShowDocs md={require('../docs/floatingElements.md')} />;
export const Demo = () => {
  const cursorFloatAmount = text('<CursorStyle>floatAmount', '0.05');
  const cursorFloatDuration = text('<CursorStyle>floatDuration', '1.02');
  const cursorFloatFollow = boolean('<CursorStyle>floatFollow', true);
  const elementFloatTriggerOffset = text('<CursorStyle>floatTriggerOffset', 'example : 20');
  const elementFloatSpringToPosition = boolean('<CursorStyle>floatSpringToPosition', false);
  useEffect(() => {
    let el = document.querySelector('.floatElement');
    if (cursorFloatFollow) {
      // @ts-ignore
      el.setAttribute('data-cursor-float-follow', 'true');
    } else {
      // @ts-ignore
      el.removeAttribute('data-cursor-float-follow');
    }
  }, [elementFloatTriggerOffset, cursorFloatFollow]);
  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorTransparency={'100'}
          cursorSize={30}
          // floatAmount={}
          // floatFollow={}
          floatSpringToPosition={elementFloatSpringToPosition}
          // floatDuration={}
          // floatEase={}
        />
        <CursorStyle
          float={true}
          floatAmount={cursorFloatAmount}
          floatFollow={cursorFloatFollow}
          floatTriggerOffset={elementFloatTriggerOffset}
          floatSpringToPosition={elementFloatSpringToPosition}
          floatAnimationDuration={cursorFloatDuration}
          // floatEase={}
        >
          <div
            id="floatElement"
            className="floatElement"
            style={{
              borderRadius: '20px',
              background: '#c5ded8',
              width: '280px',
              padding: '2em',
            }}>
            <h1 style={{ margin: '0' }} id="stick-title">
              Float Effect
            </h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with :</p>
            <p></p>
            <div style={{ textAlign: 'left' }}>
              <div style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> float = &#123;true&#125; <br />
                {/*----*/}
                floatAmount = &#123;{cursorFloatAmount}&#125; <br />
                {/*----*/}
                floatDuration = &#123;'{cursorFloatDuration}'&#125; <br />
                {/*----*/}
                {cursorFloatFollow ? (
                  <div> floatFollow = &#123;true&#125; </div>
                ) : (
                  <div> floatFollow = &#123;false&#125; </div>
                )}
                {/*----*/}
                floatTriggerOffset = &#123;'{elementFloatTriggerOffset}'&#125;
                {/*----*/}
              </div>
              {elementFloatSpringToPosition ? (
                <div> floatSpringToPosition = &#123;true&#125; </div>
              ) : (
                <div> floatSpringToPosition = &#123;false&#125; </div>
              )}

              {/*----*/}

              <b>
                {' '}
                &#62; <br /> &lt;/CursorStyle&gt;
              </b>
            </div>
          </div>
        </CursorStyle>
      </div>
    );
  };
  return demoComponent();
};
export default {
  title: 'Cursor/Floating Elements',
  decorators: [withKnobs],
};
