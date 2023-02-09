import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <body style={{ 'height': '100vh' }}>
      <Cursor isGelly={true} />
      <div data-cursor-stick="#stick-title">
        <h1 id="stick-title" style={{textAlign: 'center'}}>Sticky Cursor</h1>
      </div>



    </body>
  );
};

storiesOf('Cursor/StickyCursor', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
