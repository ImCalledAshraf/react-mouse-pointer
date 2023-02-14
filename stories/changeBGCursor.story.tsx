import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <body style={{ height: '100vh' }}>
      <Cursor isGelly={true} borderRadius={'40%'}/>
      <div
        data-cursor-background-image="https://reactjs.org/logo-og.png"
        // data-cursor-background-image-scale="3"
        data-cursor-border-radius = "40%"
        data-cursor-size="200px"
        data-cursor-outline-color="red"
        data-cursor-outline-width="0"
      >
        <h1 id="stick-title">React.js</h1>
      </div>
    </body>
  );
};

storiesOf('Cursor/ChangeBackground', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/changeBackground.md')} />)
  .add('Demo', () => <Demo />);
