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
      <div data-cursor-background-color="#61dbfb">
        <h1 id="stick-title">Colorized Cursor Background</h1>
      </div>

      <div data-cursor-outline-color="green">
        <h1 id="stick-title">Colorized Cursor Outline</h1>
      </div>
    </body>
  );
};

storiesOf('Cursor/ChangeColor', module)
  .add('Docs', () => <ShowDocs md={require('../docs/changeColorCursor.md')} />)
  .add('Demo', () => <Demo />);
