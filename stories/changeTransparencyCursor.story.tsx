import * as React from 'react';
import { Cursor } from '../src/Cursor';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { withKnobs } from '@storybook/addon-knobs';


export const Docs = () => (
  <ShowDocs md={require('../docs/changeTransparency.md')} />
);
export const Demo = () =>{

const demoComponent = () => {
  return (
    <div style={{ height: '95vh' }} >
      <Cursor isGelly={true} cursorSize={30}/>
      <div
        style={{
          borderRadius: '20px',
          outline: '2px solid greenyellow',
          padding: '2em',
          display: 'grid',
          placeItems: 'center'
        }}
        data-cursor-transparency="100%">
        <h1 style={{margin:'0'}} id="stick-title">100% Transparency </h1>
        <h3 style={{margin:'0'}}>Hover To Change Cursor's Trapsparency</h3>
      </div>
      <br />
      <br />
      <br />
      <div
        style={{
          borderRadius: '20px',
          outline: '2px solid orange',
          padding: '2em',
          display: 'grid',
          placeItems: 'center'
        }}
        data-cursor-transparency="50%">
        <h1 style={{margin:'0'}} id="stick-title">50% Transparency </h1>
        <h3 style={{margin:'0'}}>Hover To Change Cursor's Trapsparency</h3>
      </div>
      <br />
      <br />
      <br />
      <div
        style={{
          borderRadius: '20px',
          outline: '2px solid red',
          padding: '2em',
          display: 'grid',
          placeItems: 'center'
        }}
        data-cursor-transparency="0%">
        <h1 style={{margin:'0'}} id="stick-title">0% Transparency </h1>
        <h3 style={{margin:'0'}}>Hover To Change Cursor's Trapsparency</h3>
      </div>
    </div>
  );
};
return demoComponent();
}

export default {
  title: 'Cursor/Transparency',
  decorators: [withKnobs],
};
