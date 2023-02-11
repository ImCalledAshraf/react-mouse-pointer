import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <div style={{ 'height': '100vh' }}>
      <Cursor isGelly={true} cursorTransparency={'100'} cursorSize={30}/>
      <br />
      <br />
      <br />

      {/*<div*/}
      {/*  data-cursor-float*/}
      {/*  style={{ width: '200px', background: 'red' }}>*/}
      {/*  <h1 id='stick-title'>Float Element</h1>*/}
      {/*</div>*/}
      <div
        data-cursor-float
        data-cursor-float-amount='0.05'
        data-cursor-float-duration='1.02'
        data-cursor-float-follow='true'
        // data-cursor-float-trigger-offset={'10'}
        style={{ width: '200px', background: 'red' }}>
        <h1 id='stick-title'>Float Element</h1>
      </div>
    </div>
  );
};

storiesOf('Cursor/Floating', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
