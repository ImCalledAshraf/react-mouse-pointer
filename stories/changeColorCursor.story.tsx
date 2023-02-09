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
      <div data-cursor-color="#61dbfb">
        <h1 id="stick-title">Colorized Cursor</h1>
      </div>
    </body>
  );
};

storiesOf('Cursor/ChangeColor', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
