import { storiesOf } from '@storybook/react';
import * as React from 'react';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
storiesOf('Introduction/Readme', module)
  .add('README', () => <ShowDocs md={require('/README.md')} />)

