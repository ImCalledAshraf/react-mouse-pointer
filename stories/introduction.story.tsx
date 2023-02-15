import { storiesOf } from '@storybook/react';
import * as React from 'react';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
//
// const Demo = () => {
//   return (
//     <div style={{ height: '100vh' }}>
//       <h3>Introduction</h3>
//     </div>
//   );
// };
storiesOf('Introduction/Readme', module)
  .add('README', () => <ShowDocs md={require('/README.md')} />)
  // .add('README', () => <Demo />);

