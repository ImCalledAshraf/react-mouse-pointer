import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <body style={{ 'height': '100vh', display: 'grid', placeItems: 'center' }}>
    <Cursor isGelly={false} cursorSize={30} />
    <div data-cursor-stick='#stick-title' data-cursor-magnetic data-cursor-shapeshift>
      <h1 id='stick-title'>Magnetic Cursor</h1>
    </div>


    <div data-cursor-stick='#stick-title'
         data-cursor-shapeshift
         // data-cursor-border-radius = "40%"
         data-cursor-outline-color= "red"
          data-cursor-color = "red"
         style={{
           borderRadius: '20px 40px 180px 20px',
           background: 'red',
           'width': '50px',
           height: '50px'
         }}>
      <img id='stick-title' src={'/images/icon.png'} height={50} width={50} />
    </div>


    </body>
  );
};

storiesOf('Cursor/ShapeShift', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/test.md')} />)
  .add('Demo', () => <Demo />);
