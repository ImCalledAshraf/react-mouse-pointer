import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <body style={{ 'height': '100vh' }}>
    <Cursor
      isGelly={true}
      cursorSize={30}
      cursorBackgroundColor={''}/>
    <div data-cursor-text='React' data-cursor-size='100px' >
      <div data-cursor-color='black'>
        <h1 id='stick-title' >React.js</h1>
      </div>
    </div>
    </body>
  );
};

storiesOf('Cursor/TextCursor', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
