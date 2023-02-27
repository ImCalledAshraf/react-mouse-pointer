import * as React from 'react';
import '../src/misc/style.css';
// import './public/Style.css';
// import SoundButton from './public';

// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { number, withKnobs } from '@storybook/addon-knobs';
// import SoundButton from './public/SoundButton';
// import { Cursor, CursorStyle } from '../lib';
// import { Cursor, CursorStyle } from '../lib';
import { Cursor, CursorStyle } from '../src';

export const Docs = () => <ShowDocs md={require('../docs/magneticCrusor.md')} />;
export const Magnetic = () => {
  const magneticAnimationAmount = number('Magnetic Animation Amount', 0.5);
  const magneticAnimationDuration = number('Magnetic Animation Duration', 0.9);
  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          // cursorOutlineColor={'white'}
          cursorSize={30}
          magneticAmount={magneticAnimationAmount}
          magneticAnimationDuration={magneticAnimationDuration}
        />

        <CursorStyle isMagnetic={true}>
          <div
            style={{
              borderRadius: '20px',
              background: '#c5ded8',
              padding: '2em',
              display: 'grid',
              placeItems: 'center',
            }}>
            <h1 style={{ margin: '0' }} id="stick-title">
              Magnetic Effect
            </h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with :</p>
            <p></p>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> isMagnetic = &#123;true&#125;
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
export const MagneticWithSticky = () => {
  const magneticAnimationAmount = number('Magnetic Animation Amount', 0.2);
  const magneticAnimationDuration = number('Magnetic Animation Duration', 0.9);
  const stickAnimationAmount = number('Stick Animation Amount', 0.1);

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorSize={30}
          magneticAmount={magneticAnimationAmount}
          magneticAnimationDuration={magneticAnimationDuration}
          // magneticAnimationEase={}
          stickAmount={stickAnimationAmount}
          disableOnMobile={true}
        />
        <CursorStyle
          isMagnetic={true}
          // magneticAnimationEase={}
          // magneticAnimationDuration={55}
          // magneticAnimationAmount={0.9}
          isSticky={true}
          // stickAnimationAmount={5}
          //-
        >
          <div
            // data-cursor-stick={'true'}
            id="magneticComponent"
            style={{
              borderRadius: '20px',
              background: '#c5ded8',
              padding: '2em',
              display: 'grid',
              placeItems: 'center',
            }}>
            <h1 style={{ margin: '0' }} id="stick-title">
              Magnetic With Sticky
            </h1>
            <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
            <p style={{ margin: '0' }}>Wrapped with :</p>
            <p></p>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> isMagnetic = &#123;true&#125;
                <br />
                isSticky = &#123;true&#125;
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
  title: 'Cursor/Magnetic',
  decorators: [withKnobs],
};
