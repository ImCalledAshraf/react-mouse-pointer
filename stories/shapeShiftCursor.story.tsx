import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { number, withKnobs } from '@storybook/addon-knobs';


export const Docs = () => (
  <ShowDocs md={require('../docs/shapeShiftCursor.md')} />
);

export const ShapeShift = () => {
  const shapeShiftDuration = number('shapeShiftDuration', 0.5);

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={false}
          cursorSize={30}
          shapeShiftDuration={shapeShiftDuration}
        />
        <div
          data-cursor-shapeshift
          style={{
            borderRadius: '20px 40px 180px 20px',
            background: '#c5ded8',
            width: '200px',
            padding: '2em'
          }}>
          <h1 style={{ margin: '0' }} id='stick-title'>Shapeshift</h1>
          <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
        </div>
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
        <Cursor isGelly={false} cursorSize={30} shapeShiftDuration={shapeShiftDuration} />
        <div
          data-cursor-stick='#stick-title'
          data-cursor-magnetic
          data-cursor-shapeshift
          style={{
            borderRadius: '20px 40px 180px 20px',
            background: '#c5ded8',
            width: '200px',
            padding: '2em'

          }}>
          <h2 style={{ margin: '0' }} id='stick-title'>Magnetic Sticky Shapeshift</h2>
          <h3 style={{ margin: '0' }}>Hover To see Effect</h3>
        </div>


      </div>
    );
  };
  return demoComponent();
};

export default {
  title: 'Cursor/ShapeShift',
  decorators: [withKnobs],
};
