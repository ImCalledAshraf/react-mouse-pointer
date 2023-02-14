import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <body style={{ height: '100vh' }}>
      <Cursor isGelly={true} />

      <div style={{ backgroundColor: 'white' }}>
        <h1 data-cursor-exclusion id="stick-title">
          React.js
        </h1>
      </div>
    </body>
  );
};

storiesOf('Cursor/ExclusionCursor', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
