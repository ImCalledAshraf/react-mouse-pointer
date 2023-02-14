import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Cursor isGelly={true} cursorSize={30} cursorBackgroundColor={''} />
      <div
        // data-cursor-background-color="black"
        data-cursor-text="React"
        data-cursor-text-color="gray"
        data-cursor-text-scale="2"
        data-cursor-size="100px">
        <h1 id="stick-title">React.js</h1>
      </div>
    </div>
  );
};

storiesOf('Cursor/TextCursor', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
