import {  withKnobs } from '@storybook/addon-knobs';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import * as React from 'react';


export default {
  title: 'Cursor/Cursor',
  decorators: [withKnobs],
};

export const Docs = () => (
  <ShowDocs md={require('../docs/normalCursor.md')} />
);

export const Normal = () => {
  // const isGelly = boolean('isGelly', true);

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh' }}>
        <Cursor
          isGelly={false}
          // disableOnMobile={false}
        />
        <div style={{
          borderRadius: '20px',
          outline: '2px solid orange',
          padding: '2em',
          display: 'grid',
          placeItems: 'center'
        }}>
          <h1 style={{ margin: '0' }}>Normal Cursor</h1>
          <h3 style={{ margin: '0' }}>Move Mouse Around</h3>
          <p style={{ margin: '0' }}>Has all the Cursor Component Props, but with <b>isGelly</b> set to <b>False</b></p>
        </div>
      </div>
    );
  };

  return demoComponent();
};
export const Gelly = () => {

  const demoComponent = () => {

    return (
      <div style={{ height: '95vh' }}>
        <Cursor isGelly={true} />
        <div style={{
          borderRadius: '20px',
          outline: '2px solid orange',
          padding: '2em',
          display: 'grid',
          placeItems: 'center'
        }}>
          <h1 style={{ margin: '0' }}>Gelly Cursor</h1>
          <h3 style={{ margin: '0' }}>Move Mouse Around to see Cursor Skew Effect</h3>
          <p style={{ margin: '0' }}>Has all the Cursor Component Props, but with <b>isGelly</b> set to <b>True</b></p>

        </div>

      </div>
    );
  };

  return demoComponent();
};

