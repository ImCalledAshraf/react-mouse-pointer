import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <body style={{ height: '100vh' }}>
      <Cursor
        isGelly={true}
        cursorSize={30}
        cursorOutlineColor={'black'}
        cursorOutlineWidth={'2px'}
      />
    </body>
  );
};

storiesOf('Cursor/Normal', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
