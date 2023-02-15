import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { withKnobs } from '@storybook/addon-knobs';


export const Docs = () => (
  <ShowDocs md={require('../docs/stickyCursor.md')} />
);


export const Demo = () => {
  const demoComponent = () => {
    return (
      <div style={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
        <Cursor isGelly={true} cursorSize={30} />
        <div
          style={{
            borderRadius:'20px',
            background: '#c5ded8',
            padding: '2em',
            display: 'grid',
            placeItems: 'center'
          }}
          data-cursor-stick="#stick-title"
        >
          <h1 style={{margin:'0'}} id="stick-title">Sticky</h1>
          <h3 style={{margin:'0'}}>Hover To see Effect</h3>
        </div>

      </div>
    );
  };
  return demoComponent()
}

export default {
  title: 'Cursor/Sticky',
  decorators: [withKnobs],
};

