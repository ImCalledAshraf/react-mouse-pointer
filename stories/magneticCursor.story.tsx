import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <div style={{ 'height': '100vh', display: 'grid', placeItems: 'center' }}>
    <Cursor  isGelly={true} cursorSize={30} />
    <div
      data-cursor-stick='#stick-title'
      data-cursor-magnetic
      data-cursor-magnetic-amount="0.9"
      data-cursor-magnetic-duration="1.9"
      >
      <h1 id='stick-title'>Magnetic Cursor</h1>
    </div>


    <div
      data-cursor-magnetic
      // data-cursor-transparency='0%'
      // data-cursor-magnetic-amount={1.9}
      // data-cursor-magnetic-duration="1.9"
      data-cursor-stick='#stick-title'
      data-cursor-outline-color='lime'
      data-cursor-size='60px'
      >
      <img id='stick-title' src={'/images/icon.png'} height={50} width={50} />
    </div>

    {/*<div*/}
    {/*  data-cursor-magnetic*/}
    {/*  data-cursor-transparency='0%'*/}
    {/*  // data-cursor-stick='#stick-title'*/}
    {/*  // data-cursor-size='80px'*/}
    {/*  style={{ background: 'red', 'width': '50px', height: '50px' }}>*/}
    {/*  <img id='stick-title' src={'/images/icon.png'} height={50} width={50} />*/}
    {/*</div>*/}
    </div>
  );
};

storiesOf('Cursor/Magnetic', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
