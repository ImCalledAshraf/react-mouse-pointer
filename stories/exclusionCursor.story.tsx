import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import {  text, withKnobs } from '@storybook/addon-knobs';

export const Docs = () => (
  <ShowDocs md={require('../docs/exclusionCursor.md')} />
);
export const Demo = () => {
  const exclusionBackgroundColor = text('exclusionBackgroundColor', '#c5ded8');
  const cursorExclusionBackgroundColor = text('data-cursor-exclusion-background-color', 'red');

  const demoComponent = () => {
  return (
    <body style={{ height: '95vh' }}>
      <Cursor isGelly={true}
              cursorSize={60}
              exclusionBackgroundColor={exclusionBackgroundColor}
      />
      <div
        style={{
          borderRadius: '20px',
          background: '#c5ded8',
          padding: '2em',
          display: 'grid',
          placeItems: 'center'

        }}
        data-cursor-exclusion
        data-cursor-exclusion-background-color={cursorExclusionBackgroundColor}
      >
        <h1  id="stick-title">
          Hover Container & Text To See Effect
        </h1>
      </div>

    </body>
  );
};
return demoComponent();
};

export default {
  title: 'Cursor/Exclusion',
  decorators: [withKnobs],
};

