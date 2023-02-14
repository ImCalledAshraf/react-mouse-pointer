import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <body style={{ height: '100vh' }}>
      <Cursor isGelly={true}  />
      <div data-cursor-size="80px">
        <h1 id="stick-title">Sized Cursor</h1>
      </div>
    </body>
  );
};

storiesOf('Cursor/ChangeSize', module)
  .add('Docs', () => <ShowDocs md={require('../docs/changeSizeCursor.md')} />)
  .add('Demo', () => <Demo />);
