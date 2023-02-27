import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { number, withKnobs } from '@storybook/addon-knobs';

export const Docs = () => <ShowDocs md={require('../docs/shapeShiftCursor.md')} />;

export const ShapeShift = () => {
  const shapeShiftDuration = number('shapeShiftDuration', 0.5);

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor isGelly={false} cursorSize={30} shapeShiftAnimationDuration={shapeShiftDuration} />
        <CursorStyle shapeShift={true}>
          <div
            style={{
              borderRadius: '20px 40px 180px 20px',
              background: '#c5ded8',
              width: '250px',
              padding: '2em',
            }}>
            <h1 style={{ margin: '0' }} id="stick-title">
              ShapeShift
            </h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with :</p>
            <p></p>
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> shapeShift = &#123;true&#125;
                {/*----*/}
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
export const ShapeShiftWithStickyMagnetic = () => {
  const shapeShiftDuration = number('shapeShiftDuration', 0.5);

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={false}
          cursorSize={30}
          shapeShiftAnimationDuration={shapeShiftDuration}
          // shapeShiftAnimationEase={}
        />
        <CursorStyle
          shapeShift={true}
          // shapeShiftAnimationDuration={}
          // shapeShiftAnimationEase={}
          isSticky={true}
          isMagnetic={true}
          magneticAmount={0.2}>
          <div
            // data-cursor-stick={'true'}
            style={{
              borderRadius: '20px 40px 180px 20px',
              background: '#c5ded8',
              width: '250px',
              padding: '2em',
            }}>
            <h1 style={{ margin: '0' }} id="stick-title">
              Shapeshift With Sticky & Magnetic
            </h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with :</p>
            <p></p>
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> shapeShift = &#123;true&#125; <br />
                isSticky = &#123;true&#125; <br />
                isMagnetic = &#123;true&#125;
                {/*----*/}
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
  title: 'Cursor/ShapeShift',
  decorators: [withKnobs],
};
