import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { number, withKnobs } from '@storybook/addon-knobs';

export const Docs = () => (
  <ShowDocs md={require('../docs/magneticCrusor.md')} />
);
export const Magnetic = () => {
  const animationDuration = number('animationDuration', 1.25);
  const magneticAnimationAmount = number('Magnetic Animation Amount', 0.5);
  const magneticAnimationDuration = number('Magnetic Animation Duration', 0.9);
  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorSize={30}
          animationDuration={animationDuration}
          magneticAnimationAmount={magneticAnimationAmount}
          magneticAnimationDuration={magneticAnimationDuration}
        />
        <div
          style={{
            borderRadius: '20px',
            background: '#c5ded8',
            padding: '2em',
            display: 'grid',
            placeItems: 'center'
          }}
          data-cursor-magnetic
        >
          <h1 style={{ margin: '0' }} id='stick-title'>Magnetic</h1>
          <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
        </div>


      </div>
    );
  };
  return demoComponent();
};
export const MagneticWithSticky = () => {
  const animationDuration = number('animationDuration', 1.25);
  const magneticAnimationAmount = number('Magnetic Animation Amount', 0.5);
  const magneticAnimationDuration = number('Magnetic Animation Duration', 0.9);
  const stickAnimationAmount = number('Stick Animation Amount', 0.1);

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorSize={30}
          animationDuration={animationDuration}
          magneticAnimationAmount={magneticAnimationAmount}
          magneticAnimationDuration={magneticAnimationDuration}
          stickAnimationAmount={stickAnimationAmount}
        />
        <div
          id='magneticComponent'
          style={{
            borderRadius: '20px',
            background: '#c5ded8',
            padding: '2em',
            display: 'grid',
            placeItems: 'center'
          }}
          data-cursor-magnetic
          data-cursor-stick='#stick-title'
        >
          <h1 style={{ margin: '0' }} id='stick-title'>Magnetic & Sticky</h1>
          <h3 style={{ margin: '0' }}>Hover To see Effect</h3></div>


      </div>
    );
  };
  return demoComponent();
};

export default {
  title: 'Cursor/Magnetic',
  decorators: [withKnobs],
};

