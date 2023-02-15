import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { useEffect, useState } from 'react';


export const Docs = () => (
  <ShowDocs md={require('../docs/floatingElements.md')} />
);
export const Demo = () => {
  const cursorFloatAmount = text('data-cursor-float-amount', '0.05');
  const cursorFloatDuration = text('data-cursor-float-duration', '1.02');
  const cursorFloatFollow = boolean('data-cursor-float-follow', true);
  const elementFloatTriggerOffset = text('data-cursor-float-trigger-offset', 'example : 20');
  const elementFloatSpringToPosition = boolean('elementFloatSpringToPosition', false);

  const demoComponent = () => {

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
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorTransparency={'100'}
          cursorSize={30}
          elementFloatSpringToPosition={elementFloatSpringToPosition}
        />


        <div
          id='floatElement'
          className='floatElement'
          data-cursor-float
          data-cursor-float-amount={cursorFloatAmount}
          data-cursor-float-duration={cursorFloatDuration}
          data-cursor-float-follow
          data-cursor-float-trigger-offset={elementFloatTriggerOffset}
          style={{
            borderRadius: '20px',
            background: '#c5ded8',
            width: '200px',
            padding: '2em'

          }}>
          <h1 style={{ margin: '0' }} id='stick-title'>Float Element</h1>
          <h3 style={{ margin: '0' }}>Move Mouse Around To see Effect</h3></div>
      </div>
    );
  };
  return demoComponent();
};
export const FloatTriggerVisualised = () => {
  const cursorFloatAmount = text('data-cursor-float-amount', '0.05');
  const cursorFloatDuration = text('data-cursor-float-duration', '1.02');
  const cursorFloatFollow = boolean('data-cursor-float-follow', true);
  const elementFloatTriggerOffset = text('data-cursor-float-trigger-offset', '20');
  const elementFloatSpringToPosition = boolean('elementFloatSpringToPosition', false);

  const demoComponent = () => {
    let [triggerDistanceCalc, setTriggerDistanceCalc] = useState();
    let [floatElementWidth, setFloatElementWidth] = useState();
    useEffect(() => {
      let el = document.querySelector('.floatElement');
      // @ts-ignore
      setFloatElementWidth((el.getBoundingClientRect().width * 1));
      // @ts-ignore
      setTriggerDistanceCalc((el.getBoundingClientRect().width * 1) + (1 * elementFloatTriggerOffset));

      if (cursorFloatFollow) {
        // @ts-ignore
        el.setAttribute('data-cursor-float-follow', 'true');
      } else {
        // @ts-ignore
        el.removeAttribute('data-cursor-float-follow');
      }
    }, [elementFloatTriggerOffset, cursorFloatFollow]);
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor
          isGelly={true}
          cursorTransparency={'100'}
          cursorSize={30}
          elementFloatSpringToPosition={elementFloatSpringToPosition}
        />
        <div
          className='offsetVisualise'
          style={{
            clipPath: `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`,
            borderRadius: '80px',
            display: 'grid',
            placeItems: 'center',
            background: 'red',
            // height: `calc(${cursorFloatTriggerOffset}px + 200px)`,
            width: `calc(${floatElementWidth}px + ${triggerDistanceCalc}px)`,
            height: `calc(${floatElementWidth}px + ${triggerDistanceCalc}px)`,
          }}
        >


          <div
            id='floatElement'
            className='floatElement'
            data-cursor-float
            data-cursor-float-amount={cursorFloatAmount}
            data-cursor-float-duration={cursorFloatDuration}
            data-cursor-float-follow
            data-cursor-float-trigger-offset={elementFloatTriggerOffset}
            style={{
              borderRadius: '20px',
              background: '#c5ded8',
              width: '200px',
              padding: '2em'

            }}>
            <h1 style={{ margin: '0' }} id='stick-title'>Float Element</h1>
            <h3 style={{ margin: '0' }}>Move Mouse Around To see Effect</h3></div>
        </div>
      </div>

    );
  };
  return demoComponent();
};
export default {
  title: 'Cursor/Floating Elements',
  decorators: [withKnobs],
};
