import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <body style={{ height: '100vh' }} >
      <Cursor isGelly={true} cursorSize={30}/>
      <div data-cursor-transparency="100%">
        <h1 id="stick-title">100% Transparency </h1>
      </div>

      <div data-cursor-transparency="50%">
        <h1 id="stick-title">50% Transparency</h1>
      </div>
      <div data-cursor-transparency="0%">
        <h1 id="stick-title">0% Transparency</h1>
      </div>
    </body>
  );
};

storiesOf('Cursor/ChangeTransparency', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
