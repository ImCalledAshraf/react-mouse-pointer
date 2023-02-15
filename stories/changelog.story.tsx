import { storiesOf } from '@storybook/react';
import * as React from 'react';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  return (
    <div style={{ height: '95vh' }}>
      <h3>Introduction</h3>
    </div>
  );
};

storiesOf('Introduction/Changelog', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/changeBackgroundCursor.md')} />)
  .add('CHANGELOG', () => <Demo />);


